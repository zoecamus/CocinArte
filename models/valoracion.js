import mongoose from "mongoose";

const valoracionSchema = new mongoose.Schema({
  id_valoracion: Number,
  usuario_id: Number,                       // quién valoró
  tipo: { type: String, enum: ["receta", "libro", "video"] },
  ref_id: Number,                           // id del recurso valorado
  puntuacion: { type: Number, min: 1, max: 5 },
  comentario: String,
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model("Valoracion", valoracionSchema);
