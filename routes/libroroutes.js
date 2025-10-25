import express from "express";
import Libro from "../models/libro.js";

const router = express.Router();

// Obtener todos los libros
router.get("/", async (req, res) => {
  const libros = await Libro.find();
  res.json(libros);
});

// Buscar libros por ingrediente
router.get("/buscar/:ingrediente", async (req, res) => {
  const { ingrediente } = req.params;
  const libros = await Libro.find({ ingredientes_relacionados: ingrediente });
  res.json(libros);
});

// Crear libro
router.post("/", async (req, res) => {
  const nuevoLibro = new Libro(req.body);
  await nuevoLibro.save();
  res.json({ mensaje: "Libro agregado", libro: nuevoLibro });
});

export default router;
