import express from "express";
import Projeto from "../models/ProjetoModel.js";
import { projetoCreateSchema, projetoUpdateSchema } from "../validators/ProjetoValidator.js";

const router = express.Router();

// Criar projeto
router.post("/", async (req, res) => {
  try {
    await projetoCreateSchema.validate(req.body, { abortEarly: false });
    const novo = await Projeto.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.errors || err.message });
  }
});

// Listar todos
router.get("/", async (_, res) => {
  const dados = await Projeto.find();
  res.json(dados);
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const projeto = await Projeto.findById(req.params.id);
    if (!projeto) return res.status(404).json({ erro: "Projeto não encontrado" });
    res.json(projeto);
  } catch {
    res.status(400).json({ erro: "ID inválido" });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    await projetoUpdateSchema.validate(req.body, { abortEarly: false });
    const atualizado = await Projeto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ erro: "Projeto não encontrado" });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erro: err.errors || err.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  const deletado = await Projeto.findByIdAndDelete(req.params.id);
  if (!deletado) return res.status(404).json({ erro: "Projeto não encontrado" });
  res.json({ mensagem: "Projeto removido com sucesso" });
});

export default router;
