import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import libroRoutes from "./routes/libroRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import recetaRoutes from "./routes/recetaRoutes.js";
import valoracionRoutes from "./routes/valoracionRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Conexión a MongoDB Atlas
const MONGO_URI =
  "mongodb+srv://eva_db_user:Eva2025@cocinarte.nqf7aic.mongodb.net/CocinArte";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas (CocinArte)"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// 🔹 Rutas
app.use("/usuarios", usuarioRoutes);
app.use("/libros", libroRoutes);
app.use("/videos", videoRoutes);
app.use("/recetas", recetaRoutes);
app.use("/valoraciones", valoracionRoutes);

// 🔹 Ruta principal
app.get("/", (_req, res) => res.send("API de CocinArte funcionando ✅"));

// 🔹 Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`));
