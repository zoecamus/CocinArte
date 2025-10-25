const mongoose = require('mongoose');
const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  recetas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Receta' }],
  fecha_creacion: { type: Date, default: Date.now }
}, { collection: 'Libro' });
module.exports = mongoose.model('Libro', libroSchema);