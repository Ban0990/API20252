import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// TOKEN ESTÁTICO ÚNICO VÁLIDO
const TOKEN_ESTATICO = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZSI6InN5c3RlbSIsImlhdCI6MTc2MTI4MTk0N30.y_ucHxaAL2MQ49szPpk3C5WYRO8I61VhgBXM40_m6_w';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  // ✅ Solo acepta el token exacto
  if (token !== TOKEN_ESTATICO) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  // (Opcional) Si quieres extraer datos del payload:
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};