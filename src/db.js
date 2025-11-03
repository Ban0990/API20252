// src/db.js
import mysql from "mysql2/promise";
import { BD_HOST, BD_DATABASE, BD_USER, BD_PASSWORD, BD_PORT } from "./config.js";

// Crear pool de conexiones (más eficiente que una sola conexión)
export const conmysql = mysql.createPool({
  host: BD_HOST,
  database: BD_DATABASE,
  user: BD_USER,
  password: BD_PASSWORD,
  port: BD_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verificar conexión automáticamente al iniciar
(async () => {
  try {
    const connection = await conmysql.getConnection();
    console.log(`✅ Conectado exitosamente a la base de datos: ${BD_DATABASE} (${BD_HOST}:${BD_PORT})`);
    connection.release();
  } catch (err) {
    console.error("❌ Error al conectar con la base de datos:", err.message);
  }
})();
