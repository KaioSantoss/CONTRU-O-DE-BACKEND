import express from "express";
import Funcionario from "../models/FuncionarioModel.js";
import Cargo from "../models/CargoModel.js";
import Departamento from "../models/DepartamentoModel.js";
import { funcionarioCreateSchema, funcionarioUpdateSchema } from "../validators/FuncionarioValidator.js";

const router = express.Router();

// Criar funcionário
router.post("/", async (req, res) => {
  try {
    await funcionarioCreateSchema.validate(req.body, { abortEarly: false });

    const cargoExiste = await Cargo.findById(req.body.cargo);
    const depExiste = await Departamento.findById(req.body.departamento);
    if (!cargoExiste) return res.status(400).json({ erro: "Cargo inválido" });
    if (!depExiste) return res.status(400).json({ erro: "Departamento inválido" });

    const novo = await Funcionario.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.errors || err.message });
  }
});

// Listar todos
router.get("/", async (_, res) => {
  const funcionarios = await Funcionario.find().populate(["cargo", "departamento"]);
  res.json(funcionarios);
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const func = await Funcionario.findById(req.params.id).populate(["cargo", "departamento"]);
    if (!func) return res.status(404).json({ erro: "Funcionário não encontrado" });
    res.json(func);
  } catch {
    res.status(400).json({ erro: "ID inválido" });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    await funcionarioUpdateSchema.validate(req.body, { abortEarly: false });
    const atualizado = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ erro: "Funcionário não encontrado" });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erro: err.errors || err.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  const deletado = await Funcionario.findByIdAndDelete(req.params.id);
  if (!deletado) return res.status(404).json({ erro: "Funcionário não encontrado" });
  res.json({ mensagem: "Funcionário removido com sucesso" });
});

export default router;
