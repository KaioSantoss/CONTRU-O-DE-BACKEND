import mongoose from "mongoose";

const EnderecoSchema = new mongoose.Schema({
  cep: String,
  logradouro: String,
  numero: String,
  complemento: String,
  bairro: String,
  cidade: String,
  uf: String,
});

const FuncionarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    data_contratacao: { type: Date, required: true },
    data_nascimento: { type: Date, required: true },
    genero: { type: String, required: true },
    endereco: EnderecoSchema,
    cargo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cargos",
      required: true,
    },
    departamento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departamentos",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Funcionarios", FuncionarioSchema);
