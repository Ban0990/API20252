import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JWT_SECRET } from '../config.js';

dotenv.config();

const TOKEN_ESTATICO = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZSI6InN5c3RlbSIsImlhdCI6MTc2MTI4MTk0N30.y_ucHxaAL2MQ49szPpk3C5WYRO8I61VhgBXM40_m6_w';

export const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  console.log('🪪 Header recibido:', token); // <--- Verifica lo que llega

  if (!token || token.trim() === '') {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  // Limpia espacios y formato
  token = token.trim();
  if (token.startsWith('Bearer ')) {
    token = token.slice(7).trim();
  }

  // Permitir token estático
  if (token === TOKEN_ESTATICO) {
    req.userId = 0;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET || process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error('❌ Error al verificar token:', err.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
