// src/config.js
import { config } from "dotenv";
config();

// Variables de base de datos (Railway o local)
export const BD_HOST = process.env.BD_HOST || "localhost";
export const BD_DATABASE = process.env.BD_DATABASE || "baseapp2025";
export const BD_USER = process.env.BD_USER || "root";
export const BD_PASSWORD = process.env.BD_PASSWORD || "";
export const BD_PORT = process.env.BD_PORT || 3306;

// Puerto dinámico para Render o 3000 en local
export const PORT = process.env.PORT || 3000;

// Tokens y claves
export const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_super_seguro";
export const TOKEN_ESTATICO =
  process.env.TOKEN_ESTATICO ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZSI6InN5c3RlbSIsImlhdCI6MTc2MTI4MTk0N30.y_ucHxaAL2MQ49szPpk3C5WYRO8I61VhgBXM40_m6_w";
