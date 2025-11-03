import {conmysql} from '../db.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getUsuarios=
async (req,res)=>{
    try {
        const [result] = await conmysql.query(' select * from usuarios ')
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:"Error al consultar usuarios"})
    }
}

export const getUsuariosxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from usuarios where usr_id=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Usuario no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}

export const postUsuario = async (req, res) => {
  try {
    const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;
    
    // ✅ Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(usr_clave, saltRounds);

    const [rows] = await conmysql.query(
      'INSERT INTO usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) VALUES (?, ?, ?, ?, ?, ?)',
      [usr_usuario, hashedPassword, usr_nombre, usr_telefono, usr_correo, usr_activo]
    );

    res.send({ id: rows.insertId });
  } catch (error) {
    return res.status(500).json({ message: 'Error del lado del servidor' });
  }
};


export const login = async (req, res) => {
  try {
    const { usr_usuario, usr_clave } = req.body;

    if (!usr_usuario || !usr_clave) {
      return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
    }

    // Buscar usuario
    const [rows] = await conmysql.query(
      'SELECT * FROM usuarios WHERE usr_usuario = ?',
      [usr_usuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const usuario = rows[0];
    const contrasenaValida = await bcrypt.compare(usr_clave, usuario.usr_clave);

    if (!contrasenaValida) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.usr_id, usuario: usuario.usr_usuario },
      process.env.JWT_SECRET || "tu_secreto_super_seguro",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      auth: true,
      token,
      usuario: {
        id: usuario.usr_id,
        nombre: usuario.usr_nombre,
        correo: usuario.usr_correo
      }
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};

export const putUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

    // 🔒 Si viene una nueva contraseña, hashearla
    let hashedPassword = usr_clave;
    if (usr_clave && !usr_clave.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(usr_clave, salt);
    }

    const [result] = await conmysql.query(
      'UPDATE usuarios SET usr_usuario=?, usr_clave=?, usr_nombre=?, usr_telefono=?, usr_correo=?, usr_activo=? WHERE usr_id=?',
      [usr_usuario, hashedPassword, usr_nombre, usr_telefono, usr_correo, usr_activo, id]
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    const [rows] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id=?', [id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Error del lado del servidor' });
  }
};

export const patchUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

    // 🔒 Si se envía una nueva contraseña y no está cifrada, se cifra
    let hashedPassword = usr_clave;
    if (usr_clave && !usr_clave.startsWith('$2b$') && !usr_clave.startsWith('$2a$')) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(usr_clave, salt);
    }

    // ⚙️ Actualización con IFNULL para solo modificar campos enviados
    const [result] = await conmysql.query(
      `UPDATE usuarios 
       SET usr_usuario = IFNULL(?, usr_usuario),
           usr_clave   = IFNULL(?, usr_clave),
           usr_nombre  = IFNULL(?, usr_nombre),
           usr_telefono= IFNULL(?, usr_telefono),
           usr_correo  = IFNULL(?, usr_correo),
           usr_activo  = IFNULL(?, usr_activo)
       WHERE usr_id = ?`,
      [usr_usuario, hashedPassword, usr_nombre, usr_telefono, usr_correo, usr_activo, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // 🔍 Retornar el usuario actualizado
    const [rows] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error en patchUsuario:", error);
    return res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};


export const deleteUsuario = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM Usuarios WHERE usr_id = ?', [req.params.id])
        if (rows.affectedRows <= 0) return res.status(404).json({
            id: 0,
            message: 'No se pudo eliminar el usuario'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: "Error de lado del servidor"
        })
    }
}