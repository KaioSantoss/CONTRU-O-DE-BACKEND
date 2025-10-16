const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Conexão com MongoDB Atlas
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar:', err));

// Modelo de Livro
const livroSchema = new mongoose.Schema({
  _id: Number,
  titulo: String,
  autor: String,
  editora: String,
  ano: Number,
  preco: Number
});

const Livro = mongoose.model('Livro', livroSchema);

// Endpoints CRUD

// Criar livro
app.post('/livros', async (req, res) => {
  try {
    const novoLivro = new Livro(req.body);
    const livroSalvo = await novoLivro.save();
    res.status(201).json(livroSalvo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// Listar todos os livros
app.get('/livros', async (req, res) => {
  const livros = await Livro.find();
  res.json(livros);
});

// Buscar livro por ID
app.get('/livros/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(livro);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// Atualizar livro
app.put('/livros/:id', async (req, res) => {
  try {
    const livroAtualizado = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livroAtualizado) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(livroAtualizado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// Remover livro
app.delete('/livros/:id', async (req, res) => {
  try {
    const livroRemovido = await Livro.findByIdAndDelete(req.params.id);
    if (!livroRemovido) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json({ mensagem: 'Livro removido com sucesso' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
