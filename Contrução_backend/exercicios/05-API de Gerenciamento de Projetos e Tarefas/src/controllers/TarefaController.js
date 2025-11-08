import express from "express";
import Tarefa from "../models/TarefaModel.js";
import Funcionario from "../models/FuncionarioModel.js";
import Projeto from "../models/ProjetoModel.js";
import { tarefaCreateSchema, tarefaUpdateSchema } from "../validators/TarefaValidator.js";

const router = express.Router();

// Criar tarefa
router.post("/", async (req, res) => {
  try {
    await tarefaCreateSchema.validate(req.body, { abortEarly: false });

    const funcExiste = await Funcionario.findById(req.body.responsavel);
    const projExiste = await Projeto.findById(req.body.projeto);
    if (!funcExiste) return res.status(400).json({ erro: "Funcionário responsável inválido" });
    if (!projExiste) return res.status(400).json({ erro: "Projeto inválido" });

    const novo = await Tarefa.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.errors || err.message });
  }
});

// Listar todos
router.get("/", async (_, res) => {
  const tarefas = await Tarefa.find().populate(["responsavel", "projeto"]);
  res.json(tarefas);
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id).populate(["responsavel", "projeto"]);
    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json(tarefa);
  } catch {
    res.status(400).json({ erro: "ID inválido" });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    await tarefaUpdateSchema.validate(req.body, { abortEarly: false });
    const atualizado = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erro: err.errors || err.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  const deletado = await Tarefa.findByIdAndDelete(req.params.id);
  if (!deletado) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.json({ mensagem: "Tarefa removida com sucesso" });
});

export default router;
