/* import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs';
//importar las rutas
import clientesRoutes from './routes/clientes.routes.js'
import productosRoutes from './routes/productos.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js'

//definir los modulos de entrada
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

//definir los permisos
const corsOptions={
    origin:'*', //la direccion del dominio del servidor
    methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials:true
}


const app=express();
app.use(cors(corsOptions));
app.use(express.json()) //interpretar objetos json
app.use(express.urlencoded({extended:true})) //se añade para poder receptar por unidad
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

//ver ruta 
/*app.use('/uploads', (req, res, next) => {
  const filePath = path.join(__dirname, '../uploads', req.url);
  console.log('Solicitud de imagen:', req.url);
  console.log('Ruta absoluta:', filePath);

  if (fs.existsSync(filePath)) {
    console.log('✅ Archivo encontrado');
  } else {
    console.log('❌ Archivo NO encontrado');
  }
  next();
}, express.static(path.join(__dirname, '../uploads')));

//indicar que rutas se utilice ojo
app.use('/api', clientesRoutes)
app.use('/api', productosRoutes)
app.use('/api', usuariosRoutes)
app.use('/api', pedidosRoutes)

app.use((req,res,next)=>{
    res.status(404).json({
        message:' Endponit not fount'
    })
})

export default app;
*/
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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
    '*', // permite todo — para producción puedes cambiarlo
    'http://localhost:8100', // Ionic local
    'http://localhost:4200', // Angular local
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const app = express();

// Middlewares base
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (como imágenes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🚀 Ruta raíz para verificar el estado del servidor
app.get('/', (req, res) => {
  res.json({
    status: '✅ API activa y funcionando correctamente',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'local',
  });
});

// Rutas principales
app.use('/api', clientesRoutes);
app.use('/api', productosRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', pedidosRoutes);

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    message: '❌ Endpoint no encontrado',
    url: req.originalUrl,
  });
});

// Exportar app
export default app;
