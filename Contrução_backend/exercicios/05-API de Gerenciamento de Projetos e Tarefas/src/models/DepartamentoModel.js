import mongoose from "mongoose";

const DepartamentoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Departamentos", DepartamentoSchema);
