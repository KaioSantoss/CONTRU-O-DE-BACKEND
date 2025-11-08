import * as yup from "yup";
import mongoose from "mongoose";

export const funcionarioCreateSchema = yup.object({
  nome: yup.string().required(),
  cpf: yup.string().required(),
  email: yup.string().email().required(),
  telefone: yup.string().required(),
  data_contratacao: yup.date().required(),
  data_nascimento: yup.date().required(),
  genero: yup.string().required(),
  endereco: yup.object({
    cep: yup.string(),
    logradouro: yup.string(),
    numero: yup.string(),
    complemento: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    uf: yup.string(),
  }),
  cargo: yup
    .string()
    .test("is-valid-id", "ID de cargo inválido", (v) => mongoose.Types.ObjectId.isValid(v))
    .required(),
  departamento: yup
    .string()
    .test("is-valid-id", "ID de departamento inválido", (v) => mongoose.Types.ObjectId.isValid(v))
    .required(),
});

export const funcionarioUpdateSchema = funcionarioCreateSchema.noUnknown();
