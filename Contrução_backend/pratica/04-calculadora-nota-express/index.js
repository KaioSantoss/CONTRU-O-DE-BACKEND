// importa o express
const express = require('express')
// crio uma instância do express
const app = express()

// Middlewares (Intermediários)
// Intermediário de log
app.use((req, res, next) => {
  console.log("-------------####-------------")
  console.log("Tempo: ", new Date().toLocaleString())
  console.log("Metodo: ", req.method)
  console.log("Rota: ", req.url)
  next()
})

app.get('/nome', (req, res, next) => {
  // Capturar informação do usuário
  // vão vir através dos parametros da requisição (query params)
  const primeiroNome = req.query.primeiroNome
  const sobreNome = req.query.sobreNome

  res.send("Olá " + primeiroNome + " " + sobreNome + "!!!") 
})
// Importando o router calculadora de nota
const calculadoraNotaRouter = require('./routes/calculadoranota')
// Toda requisição que chegar na rota /calculadora vai para o router
app.use('/calculadora', calculadoraNotaRouter)


// executar a aplicação
app.listen(3000, () => {
  console.log("Aplicação rodando em http://localhost:3000")
})