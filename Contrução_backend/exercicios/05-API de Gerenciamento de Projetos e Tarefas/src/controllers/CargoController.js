import express from "express";
import Cargo from "../models/CargoModel.js";
import { cargoCreateSchema, cargoUpdateSchema } from "../validators/CargoValidator.js";

const router = express.Router();

// Criar cargo
router.post("/", async (req, res) => {
  try {
    await cargoCreateSchema.validate(req.body, { abortEarly: false });
    const novo = await Cargo.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.errors || err.message });
  }
});

// Listar todos
router.get("/", async (_, res) => {
  const dados = await Cargo.find();
  res.json(dados);
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const cargo = await Cargo.findById(req.params.id);
    if (!cargo) return res.status(404).json({ erro: "Cargo não encontrado" });
    res.json(cargo);
  } catch {
    res.status(400).json({ erro: "ID inválido" });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    await cargoUpdateSchema.validate(req.body, { abortEarly: false });
    const atualizado = await Cargo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ erro: "Cargo não encontrado" });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erro: err.errors || err.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  const deletado = await Cargo.findByIdAndDelete(req.params.id);
  if (!deletado) return res.status(404).json({ erro: "Cargo não encontrado" });
  res.json({ mensagem: "Cargo removido com sucesso" });
});

export default router;
