import * as yup from "yup";

export const cargoCreateSchema = yup.object({
  nome: yup.string().required(),
  descricao: yup.string().required(),
  salario: yup
    .number()
    .required()
    .min(1518, "Salário mínimo é R$ 1.518,00"),
});

export const cargoUpdateSchema = yup.object({
  nome: yup.string(),
  descricao: yup.string(),
  salario: yup.number().min(1518),
});
