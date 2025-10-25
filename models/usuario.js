const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  foto_perfil: { type: String }
}, { collection: 'Usuarios' });
module.exports = mongoose.model('Usuario', usuarioSchema);