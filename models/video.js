const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  url: { type: String, required: true },
  duracion: { type: Number, required: true },
  ingredientes: [{ type: String, required: true }],
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { collection: 'Video' });
module.exports = mongoose.model('Video', videoSchema);