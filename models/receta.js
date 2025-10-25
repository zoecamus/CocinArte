const mongoose = require('mongoose');
const ingredienteSchema = new mongoose.Schema({
  nombre: String,
  cantidad: Number,
  unidad: String
});
const valoracionSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  puntuacion: Number,
  comentario: String,
  fecha: Date
});
const recetaSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  titulo: { type: String, required: true },
  descripcion: { type: String },
  categoria: { type: String },
  dificultad: { type: String },
  tiempo_preparacion: { type: Number },
  id_usuario: { type: Number, required: true },
  ingredientes: [ingredienteSchema],
  pasos: [{ type: String }],
  valoraciones: [valoracionSchema]
}, { collection: 'Receta' });
module.exports = mongoose.model('Receta', recetaSchema);