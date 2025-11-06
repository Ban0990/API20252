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

// Configuración CORS
const corsOptions = {
  origin: [
    '*', // permite todos los orígenes — en producción usa tu dominio
    'http://localhost:8100', // Ionic local
    'http://localhost:4200', // Angular local
    'https://api20252-d1jx.onrender.com', // dominio HTTPS de producción
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const app = express();

// 🧩 Middlewares base
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🖼️ Servir archivos estáticos (imágenes subidas)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🚀 Ruta raíz para verificar el estado del servidor
app.get('/', (req, res) => {
  res.json({
    status: '✅ API activa y funcionando correctamente',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'local',
    uploads_url: `${req.protocol}://${req.get('host')}/uploads/`
  });
});

// 🧭 Rutas principales
app.use('/api', clientesRoutes);
app.use('/api', productosRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', pedidosRoutes);

// ❌ Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    message: '❌ Endpoint no encontrado',
    url: req.originalUrl,
  });
});

export default app;