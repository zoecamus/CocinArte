import express from "express";
import Video from "../models/video.js";

const router = express.Router();

// Obtener todos los videos
router.get("/", async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

// Buscar videos por ingrediente
router.get("/buscar/:ingrediente", async (req, res) => {
  const { ingrediente } = req.params;
  const videos = await Video.find({ ingredientes: ingrediente });
  res.json(videos);
});

// Crear video
router.post("/", async (req, res) => {
  const nuevoVideo = new Video(req.body);
  await nuevoVideo.save();
  res.json({ mensaje: "Video agregado", video: nuevoVideo });
});

export default router;
