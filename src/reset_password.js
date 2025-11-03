import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

dotenv.config({ path: '../.env' }); // ✅ Cargar variables de entorno

async function resetPassword() {
  try {
    // Conectar a la base de datos usando los datos del .env
    const connection = await mysql.createConnection({
      host: process.env.BD_HOST,
      user: process.env.BD_USER,
      password: process.env.BD_PASSWORD,
      database: process.env.BD_DATABASE,
      port: process.env.BD_PORT,
    });

    // Contraseña nueva (puedes cambiarla si deseas)
    const nuevaClave = '09902767';

    // Generar hash de la nueva clave
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(nuevaClave, salt);

    // Actualizar el usuario 'jhalmarM'
    const [result] = await connection.query(
      'UPDATE usuarios SET usr_clave = ? WHERE usr_usuario = ?',
      [hash, 'jhalmarM']
    );

    if (result.affectedRows > 0) {
      console.log(`✅ Contraseña del usuario 'jhalmarM' actualizada correctamente.`);
      console.log(`🔐 Nuevo hash generado: ${hash}`);
    } else {
      console.log(`⚠️ No se encontró el usuario 'jhalmarM'`);
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error al resetear contraseña:', error);
  }
}

resetPassword();
