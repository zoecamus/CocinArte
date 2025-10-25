import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import libroRoutes from "./routes/libroRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import recetaRoutes from "./routes/recetaRoutes.js";        // << NUEVO
import valoracionRoutes from "./routes/valoracionRoutes.js"; // << NUEVO

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://zcamus_db_user:3U4GCrqDSdwoLvSu@cocinarte.nqf7aic.mongodb.net/FoodShare";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar a Mongo:", err));

app.use("/usuarios", usuarioRoutes);
app.use("/libros", libroRoutes);
app.use("/videos", videoRoutes);
app.use("/recetas", recetaRoutes);            // << NUEVO
app.use("/valoraciones", valoracionRoutes);   // << NUEVO

app.get("/", (_req, res) => res.send("API de CocinArte funcionando ✅"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
