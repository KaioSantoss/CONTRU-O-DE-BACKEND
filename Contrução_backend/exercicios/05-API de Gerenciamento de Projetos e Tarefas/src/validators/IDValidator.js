import * as yup from "yup";
import mongoose from "mongoose";

export const idSchema = yup.object({
  id: yup
    .string()
    .test("is-valid-id", "ID inválido", (value) => mongoose.Types.ObjectId.isValid(value))
    .required(),
});
