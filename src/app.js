import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar rutas
import clientesRoutes from './routes/clientes.routes.js';
import productosRoutes from './routes/productos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import pedidosRoutes from './routes/pedidos.routes.js';

// Definir directorio base
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Middleware CORS — acepta cualquier origen, método y cabecera
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite todos los orígenes
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, Origin, Accept'
  );

  // Manejar preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middlewares base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta raíz de verificación
app.get('/', (req, res) => {
  res.json({
    status: '✅ API activa y funcionando correctamente',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'local',
    uploads_url: `${req.protocol}://${req.get('host')}/uploads/`
  });
});

// Rutas principales
app.use('/api', clientesRoutes);
app.use('/api', productosRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', pedidosRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    message: '❌ Endpoint no encontrado',
    url: req.originalUrl,
  });
});

export default app;
