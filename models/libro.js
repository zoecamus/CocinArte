import mongoose from "mongoose";

const libroSchema = new mongoose.Schema(
  {
    id_libro: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    link: { type: String },
    descripcion: { type: String },
    usuario_id: { type: Number, required: true },

    // Lista de ingredientes (igual que recetas)
    ingredientes: [
      {
        nombre: String,
        cantidad: Number,
        unidad: String,
      },
    ],

    // Array de strings tipo ["vegano", "celiaco", ...]
    especificaciones: [
      {
        type: String,
        enum: ["vegano", "vegetariano", "celiaco", "sin lactosa", "sin azúcar", "omnivoro"],
      },
    ],

    fecha_publicacion: { type: Date, default: Date.now },
  },
  { collection: "Libro" }
);

export default mongoose.model("Libro", libroSchema);
