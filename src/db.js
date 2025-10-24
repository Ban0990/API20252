import mysql from "mysql2/promise";
import { BD_HOST, BD_DATABASE, BD_USER, BD_PASSWORD, BD_PORT } from "./config.js";

export const conmysql = mysql.createPool({
  host: BD_HOST,
  database: BD_DATABASE,
  user: BD_USER,
  password: BD_PASSWORD,
  port: BD_PORT,
});

// Verificar conexión
(async () => {
  try {
    const connection = await conmysql.getConnection();
    console.log("✅ Conectado exitosamente a la base de datos:", BD_DATABASE);
    connection.release();
  } catch (err) {
    console.error("❌ Error al conectar con la base de datos:", err.message);
  }
})();
