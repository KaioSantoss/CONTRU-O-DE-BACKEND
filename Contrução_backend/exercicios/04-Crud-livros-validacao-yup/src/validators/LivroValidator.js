const { object, string, number } = require('yup');

const createLivroSchema = object({
  titulo: string().required('titulo é obrigatório'),
  autor: string().required('autor é obrigatório'),
  editora: string().required('editora é obrigatória'),
  ano: number().required('ano é obrigatório').typeError('ano deve ser um número'),
  preco: number().required('preco é obrigatório').typeError('preco deve ser um número').min(0, 'preco deve ser positivo')
});

const updateLivroSchema = object({
  titulo: string().notRequired(),
  autor: string().notRequired(),
  editora: string().notRequired(),
  ano: number().typeError('ano deve ser um número').notRequired(),
  preco: number().typeError('preco deve ser um número').min(0, 'preco deve ser positivo').notRequired()
});

function validate(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
      next();
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = err.inner && err.inner.length
          ? err.inner.map(e => e.message)
          : [err.message];
        return res.status(400).json({ errors });
      }
      next(err);
    }
  };
}

module.exports = {
  validateCreate: validate(createLivroSchema),
  validateUpdate: validate(updateLivroSchema)
};