// genera-token-estatico.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './src/config.js';   // mismo secreto que ya usas

const payload = { id: 0, role: 'system' };      // puedes poner lo que quieras
const token = jwt.sign(payload, JWT_SECRET);    // sin {expiresIn}

console.log('TOKEN_ESTATICO=' + token);