import express from "express";
import Video from "../models/video.js";

const router = express.Router();

// 🔹 GET todos los videos
router.get("/", async (_req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

// 🔹 Búsqueda avanzada
router.get("/buscar", async (req, res) => {
  const { ingredientes, titulo, duracion_min, duracion_max } = req.query;

  try {
    const filtro = {};

    // Buscar por ingredientes
    if (ingredientes) {
      const lista = ingredientes
        .split(/,| y /i)
        .map(i => i.trim())
        .filter(i => i.length > 0);

      filtro.$or = lista.map(nombre => ({
        "ingredientes.nombre": { $regex: new RegExp(nombre + "s?", "i") }
      }));
    }

    // Buscar por título
    if (titulo) {
      filtro.titulo = { $regex: new RegExp(titulo, "i") };
    }

    // Buscar por duración (rango)
    if (duracion_min || duracion_max) {
      filtro.duracion = {};
      if (duracion_min) filtro.duracion.$gte = Number(duracion_min);
      if (duracion_max) filtro.duracion.$lte = Number(duracion_max);
    }

    console.log("🎥 Filtro generado (videos):", filtro);

    const videos = await Video.find(filtro);
    if (!videos.length)
      return res.status(404).json({ mensaje: "No se encontraron videos con esos filtros" });

    res.json(videos);
  } catch (error) {
    console.error("Error en búsqueda de videos:", error);
    res.status(500).json({ error: "Error al buscar videos" });
  }
});

export default router;
