import express from "express";
import Receta from "../models/receta.js";

const router = express.Router();

// GET todas
router.get("/", async (_req, res) => {
  const recetas = await Receta.find();
  res.json(recetas);
});

// GET por ingrediente (exacto; para regex usar /buscar?q=harina)
router.get("/ingrediente/:nombre", async (req, res) => {
  const { nombre } = req.params;
  const recetas = await Receta.find({ ingredientes: nombre });
  res.json(recetas);
});

// GET búsqueda flexible ?q=harina
router.get("/buscar", async (req, res) => {
  const q = req.query.q || "";
  const recetas = await Receta.find({ ingredientes: { $regex: q, $options: "i" } });
  res.json(recetas);
});

// GET por autor (usuario)
router.get("/autor/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;
  const recetas = await Receta.find({ autor_usuario_id: Number(usuario_id) });
  res.json(recetas);
});

// POST crear
router.post("/", async (req, res) => {
  const nueva = new Receta(req.body);
  await nueva.save();
  res.json({ mensaje: "Receta creada", receta: nueva });
});

// PATCH actualizar media_valoracion (opcional)
router.patch("/:id_receta/media", async (req, res) => {
  const { id_receta } = req.params;
  const { media_valoracion } = req.body;
  const r = await Receta.findOneAndUpdate(
    { id_receta: Number(id_receta) },
    { media_valoracion },
    { new: true }
  );
  res.json(r);
});

export default router;
