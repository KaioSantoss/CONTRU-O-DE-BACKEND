import express from "express";
import Departamento from "../models/DepartamentoModel.js";
import { departamentoCreateSchema, departamentoUpdateSchema } from "../validators/DepartamentoValidator.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await departamentoCreateSchema.validate(req.body, { abortEarly: false });
    const novo = await Departamento.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.errors || err.message });
  }
});

router.get("/", async (_, res) => {
  const dados = await Departamento.find();
  res.json(dados);
});

router.get("/:id", async (req, res) => {
  try {
    const dado = await Departamento.findById(req.params.id);
    if (!dado) return res.status(404).json({ erro: "Departamento não encontrado" });
    res.json(dado);
  } catch {
    res.status(400).json({ erro: "ID inválido" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await departamentoUpdateSchema.validate(req.body, { abortEarly: false });
    const atualizado = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ erro: "Departamento não encontrado" });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erro: err.errors || err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const removido = await Departamento.findByIdAndDelete(req.params.id);
  if (!removido) return res.status(404).json({ erro: "Departamento não encontrado" });
  res.json({ mensagem: "Departamento removido" });
});

export default router;
