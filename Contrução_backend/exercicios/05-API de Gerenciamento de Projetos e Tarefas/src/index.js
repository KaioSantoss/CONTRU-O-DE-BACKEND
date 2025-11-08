import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import departamentoRoutes from "./controllers/DepartamentoController.js";
import cargoRoutes from "./controllers/CargoController.js";
import funcionarioRoutes from "./controllers/FuncionarioController.js";
import projetoRoutes from "./controllers/ProjetoController.js";
import tarefaRoutes from "./controllers/TarefaController.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

app.use("/departamentos", departamentoRoutes);
app.use("/cargos", cargoRoutes);
app.use("/funcionarios", funcionarioRoutes);
app.use("/projetos", projetoRoutes);
app.use("/tarefas", tarefaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
