import * as yup from "yup";

export const projetoCreateSchema = yup.object({
  nome: yup.string().required(),
  descricao: yup.string().required(),
  data_inicio: yup.date().required(),
  data_fim: yup
    .date()
    .required()
    .min(yup.ref("data_inicio"), "Data fim deve ser posterior à data início"),
});

export const projetoUpdateSchema = projetoCreateSchema.noUnknown();
