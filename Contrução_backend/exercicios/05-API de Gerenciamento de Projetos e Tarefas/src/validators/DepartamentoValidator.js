import * as yup from "yup";

export const departamentoCreateSchema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  descricao: yup.string().required("Descrição é obrigatória"),
});

export const departamentoUpdateSchema = yup.object({
  nome: yup.string(),
  descricao: yup.string(),
});
