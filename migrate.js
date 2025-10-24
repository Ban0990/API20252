// migrate.js
import mysql from 'mysql2/promise';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// conexión directa a Railway
const conn = await mysql.createConnection({
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT || 3306,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
});

// lee el SQL
const sql = fs.readFileSync(path.join(__dirname, 'baseapp2025.sql'), 'utf8');

// ejecuta sentencia por sentencia (ignora FKs si fallan)
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length && !s.startsWith('--') && !s.startsWith('/*!'));

for (const st of statements) {
  try {
    await conn.query(st);
  } catch (e) {
    // ignoramos errores de FK o duplicados
    if (!e.message.includes('FOREIGN KEY')) console.warn('⚠️', e.message);
  }
}

console.log('✅ Base de datos cargada');
await conn.end();
process.exit(0);