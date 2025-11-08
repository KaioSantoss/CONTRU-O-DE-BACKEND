import mongoose from "mongoose";

const CargoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    salario: { type: Number, required: true, min: 1518 },
  },
  { timestamps: true }
);

export default mongoose.model("Cargos", CargoSchema);
