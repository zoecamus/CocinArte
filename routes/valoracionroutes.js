import express from "express";
import Valoracion from "../models/valoracion.js";
import Receta from "../models/receta.js";

const router = express.Router();

// GET todas
router.get("/", async (_req, res) => {
  const vals = await Valoracion.find();
  res.json(vals);
});

// GET por tipo+ref (ej: /receta/12)
router.get("/:tipo/:ref_id", async (req, res) => {
  const { tipo, ref_id } = req.params;
  const vals = await Valoracion.find({ tipo, ref_id: Number(ref_id) });
  res.json(vals);
});

// POST crear valoración
router.post("/", async (req, res) => {
  const val = new Valoracion(req.body);
  await val.save();

  // Si es receta, recalcular promedio y actualizar media_valoracion
  if (val.tipo === "receta") {
    const all = await Valoracion.aggregate([
      { $match: { tipo: "receta", ref_id: val.ref_id } },
      { $group: { _id: null, avg: { $avg: "$puntuacion" } } }
    ]);
    const avg = all[0]?.avg ?? 0;
    await Receta.findOneAndUpdate({ id_receta: val.ref_id }, { media_valoracion: avg });
  }

  res.json({ mensaje: "Valoración guardada", valoracion: val });
});

// GET promedio por ref (ej: /promedio/receta/12)
router.get("/promedio/:tipo/:ref_id", async (req, res) => {
  const { tipo, ref_id } = req.params;
  const agg = await Valoracion.aggregate([
    { $match: { tipo, ref_id: Number(ref_id) } },
    { $group: { _id: null, promedio: { $avg: "$puntuacion" }, cantidad: { $sum: 1 } } }
  ]);
  res.json(agg[0] || { promedio: 0, cantidad: 0 });
});

export default router;
