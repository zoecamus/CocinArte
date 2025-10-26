const mongoose = require('mongoose');

const ingredienteSchema = new mongoose.Schema({
  nombre: String,
  cantidad: Number,
  unidad: String
});



const recetaSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    descripcion: { type: String },
    categoria: { type: String },
    dificultad: { type: String },
    tiempo_preparacion: { type: Number },
    id_usuario: { type: Number, required: true },
    ingredientes: [ingredienteSchema],
    pasos: [{ type: String }],
    especificaciones: [
      {
        type: String,
        enum: ["vegano", "vegetariano", "celiaco", "sin lactosa", "sin azúcar", "omnivoro"],
      },
    ],
  },
  { collection: "Receta" }
);

module.exports = mongoose.model("Receta", recetaSchema);
