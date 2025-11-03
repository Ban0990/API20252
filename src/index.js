// src/index.js
import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
});
