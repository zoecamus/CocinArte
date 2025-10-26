import express from "express";
import Receta from "../models/receta.js";

const router = express.Router();

// 🔹 Quita tildes y pasa a minúsculas
function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// --- Obtener todas las recetas
router.get("/", async (_req, res) => {
  const recetas = await Receta.find();
  res.json(recetas);
});

// --- Búsqueda avanzada
router.get("/buscar", async (req, res) => {
  const { ingredientes, categoria, especificaciones } = req.query;

  try {
    const condicionesAND = [];

    // --- Ingredientes
    if (ingredientes && ingredientes.trim() !== "") {
      const lista = ingredientes
        .split(/,| y /i)
        .map(i => normalizarTexto(i.trim()))
        .filter(i => i.length > 0);

      condicionesAND.push({
        $or: lista.map(nombre => ({
          "ingredientes.nombre": { $regex: new RegExp(nombre + "s?", "i") }
        }))
      });
    }

    // --- Categoría
    if (categoria && categoria.trim() !== "" && categoria !== "Todas las categorías") {
      const normalizada = normalizarTexto(categoria.replace(/s$/i, "").trim());
      condicionesAND.push({ categoria: { $regex: new RegExp(normalizada, "i") } });
    }

    // --- Especificaciones
    if (especificaciones && especificaciones.trim() !== "") {
      const listaEsp = especificaciones
        .split(/,| y /i)
        .map(e => normalizarTexto(e.trim()))
        .filter(e => e.length > 0);

      listaEsp.forEach(etiqueta => {
        condicionesAND.push({
          especificaciones: { $regex: new RegExp(etiqueta, "i") }
        });
      });
    }

    // --- Combinar condiciones
    const filtro = condicionesAND.length > 0 ? { $and: condicionesAND } : {};

    console.log("🧩 Filtro generado (recetas):", JSON.stringify(filtro, null, 2));

    const recetas = await Receta.find(filtro);

    if (!recetas.length)
      return res.status(404).json({ mensaje: "No se encontraron recetas con esos filtros" });

    res.json(recetas);
  } catch (error) {
    console.error("Error al buscar recetas:", error);
    res.status(500).json({ error: "Error al buscar recetas" });
  }
});

export default router;
