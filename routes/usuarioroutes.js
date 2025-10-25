import express from "express";
import Usuario from "../models/usuario.js";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// Crear usuario
router.post("/", async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  await nuevoUsuario.save();
  res.json({ mensaje: "Usuario creado", usuario: nuevoUsuario });
});

export default router;
