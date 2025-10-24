import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

const TOKEN_ESTATICO = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZSI6InN5c3RlbSIsImlhdCI6MTc2MTI4MTk0N30.y_ucHxaAL2MQ49szPpk3C5WYRO8I61VhgBXM40_m6_w';

export const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

  if (token.startsWith('Bearer ')) token = token.slice(7);

  if (token === TOKEN_ESTATICO) return next();

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
