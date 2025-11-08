import * as yup from "yup";
import mongoose from "mongoose";

export const tarefaCreateSchema = yup.object({
  titulo: yup.string().required(),
  descricao: yup.string().required(),
  data_inicio: yup.date().required(),
  data_fim: yup
    .date()
    .required()
    .min(yup.ref("data_inicio"), "Data fim deve ser posterior à data início"),
  responsavel: yup
    .string()
    .test("is-valid-id", "ID de funcionário inválido", (v) => mongoose.Types.ObjectId.isValid(v))
    .required(),
  projeto: yup
    .string()
    .test("is-valid-id", "ID de projeto inválido", (v) => mongoose.Types.ObjectId.isValid(v))
    .required(),
});

export const tarefaUpdateSchema = tarefaCreateSchema.noUnknown();
