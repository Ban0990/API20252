import { conmysql } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 📋 Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT * FROM usuarios');
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar usuarios" });
  }
};

// 📋 Obtener usuario por ID
export const getUsuariosxid = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id = ?', [req.params.id]);
    if (result.length <= 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Error del lado del servidor" });
  }
};

// 🧩 Crear usuario — Encriptar solo si no está ya cifrada
export const postUsuario = async (req, res) => {
  try {
    let { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

    // 🔒 Encriptar solo si no está en formato bcrypt
    if (!usr_clave.startsWith('$2b$') && !usr_clave.startsWith('$2a$')) {
      usr_clave = await bcrypt.hash(usr_clave, 10);
    }

    const [rows] = await conmysql.query(
      `INSERT INTO usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo]
    );

    res.json({ message: "Usuario creado correctamente", id: rows.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error del lado del servidor" });
  }
};

// 🔑 Login de usuario
export const login = async (req, res) => {
  try {
    const { usr_usuario, usr_clave } = req.body;

    if (!usr_usuario || !usr_clave) {
      return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
    }

    const [rows] = await conmysql.query(
      'SELECT * FROM usuarios WHERE usr_usuario = ?',
      [usr_usuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    // 🔐 Comparar contraseñas
    const contrasenaValida = await bcrypt.compare(usr_clave, usuario.usr_clave);

    if (!contrasenaValida) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 🎟️ Generar token
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
        correo: usuario.usr_correo,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};

// ✏️ Actualizar usuario completo
export const putUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    let { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

    // 🔒 Encriptar solo si no lo está
    if (usr_clave && !usr_clave.startsWith('$2b$') && !usr_clave.startsWith('$2a$')) {
      usr_clave = await bcrypt.hash(usr_clave, 10);
    }

    const [result] = await conmysql.query(
      `UPDATE usuarios 
       SET usr_usuario=?, usr_clave=?, usr_nombre=?, usr_telefono=?, usr_correo=?, usr_activo=?
       WHERE usr_id=?`,
      [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Usuario no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id=?', [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// 🧩 Actualizar usuario parcialmente
export const patchUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    let { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

    if (usr_clave && !usr_clave.startsWith('$2b$') && !usr_clave.startsWith('$2a$')) {
      usr_clave = await bcrypt.hash(usr_clave, 10);
    }

    const [result] = await conmysql.query(
      `UPDATE usuarios 
       SET usr_usuario = IFNULL(?, usr_usuario),
           usr_clave   = IFNULL(?, usr_clave),
           usr_nombre  = IFNULL(?, usr_nombre),
           usr_telefono= IFNULL(?, usr_telefono),
           usr_correo  = IFNULL(?, usr_correo),
           usr_activo  = IFNULL(?, usr_activo)
       WHERE usr_id = ?`,
      [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [rows] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// 🗑️ Eliminar usuario
export const deleteUsuario = async (req, res) => {
  try {
    const [rows] = await conmysql.query('DELETE FROM usuarios WHERE usr_id = ?', [req.params.id]);
    if (rows.affectedRows <= 0)
      return res.status(404).json({ message: 'No se pudo eliminar el usuario' });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error de lado del servidor" });
  }
};
