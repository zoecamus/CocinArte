import express from "express";
import Libro from "../models/libro.js";

const router = express.Router();

// 🔹 Quita tildes y pasa a minúsculas
function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// --- Obtener todos los libros
router.get("/", async (_req, res) => {
  const libros = await Libro.find();
  res.json(libros);
});

// --- Búsqueda avanzada
router.get("/buscar", async (req, res) => {
  const { ingredientes, titulo, descripcion, especificaciones } = req.query;

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
          "ingredientes.nombre": { $regex: new RegExp(nombre, "i") }
        }))
      });
    }

    // --- Título o descripción
    if (titulo && titulo.trim() !== "") {
      const normalizado = normalizarTexto(titulo.trim());
      condicionesAND.push({
        titulo: { $regex: new RegExp(normalizado, "i") }
      });
    }

    if (descripcion && descripcion.trim() !== "") {
      const normalizado = normalizarTexto(descripcion.trim());
      condicionesAND.push({
        descripcion: { $regex: new RegExp(normalizado, "i") }
      });
    }

    // --- Especificaciones (ARRAY DE STRINGS)
    if (especificaciones && especificaciones.trim() !== "") {
      const listaEsp = especificaciones
        .split(/,| y /i)
        .map(e => normalizarTexto(e.trim()))
        .filter(e => e.length > 0);

      listaEsp.forEach(etiqueta => {
        condicionesAND.push({
          especificaciones: { $elemMatch: { $regex: new RegExp(etiqueta, "i") } }
        });
      });
    }

    const filtro = condicionesAND.length > 0 ? { $and: condicionesAND } : {};

    console.log("📚 Filtro generado (libros):", JSON.stringify(filtro, null, 2));

    const libros = await Libro.find(filtro);

    if (!libros.length)
      return res.status(404).json({ mensaje: "No se encontraron libros con esos filtros" });

    res.json(libros);
  } catch (error) {
    console.error("❌ Error al buscar libros:", error);
    res.status(500).json({ error: "Error al buscar libros" });
  }
});

export default router;
