require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const LivroRouter = require('./controllers/LivroController');

const app = express();
app.use(express.json());

// Rotas
app.use('/livros', LivroRouter);

// Conexão com MongoDB
const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_NAME,
  PORT = 3000
} = process.env;

const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

async function start() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado ao MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao conectar no MongoDB:', err.message);
    process.exit(1);
  }
}

start();