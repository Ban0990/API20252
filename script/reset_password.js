import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Resolver ruta absoluta al .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') }); // Carga segura del .env

async function resetPassword() {
  try {
    console.log('🔍 Conectando a la base de datos con las siguientes credenciales:');
    console.log({
      BD_HOST: process.env.BD_HOST,
      BD_USER: process.env.BD_USER,
      BD_DATABASE: process.env.BD_DATABASE,
      BD_PORT: process.env.BD_PORT,
    });

    // 🧩 Conexión MySQL
    const connection = await mysql.createConnection({
      host: process.env.BD_HOST,
      user: process.env.BD_USER,
      password: process.env.BD_PASSWORD,
      database: process.env.BD_DATABASE,
      port: process.env.BD_PORT,
    });

    // 🆕 Nueva contraseña (puedes cambiarla aquí)
    const nuevaClave = 'justin2025';

    // 🔐 Generar hash de la nueva clave
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(nuevaClave, salt);

    // 🔄 Actualizar usuario específico
    const [result] = await connection.query(
      'UPDATE usuarios SET usr_clave = ? WHERE usr_usuario = ?',
      [hash, 'justinC']
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
