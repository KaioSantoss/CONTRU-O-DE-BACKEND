const express = require('express')
const router = express.Router()



// lista de pessoas pra simular o banco de dados 
let ListarPessoas = [
    {
        id: 1,
        nome: "Kaio",
        cpf: "00011199985",
        email: "kaiogato@gmail.com",
        dataNascimento: "01/01/2000"

    },
    {
        id: 2,
        nome: "jamylle",
        cpf: "11122233345",
        email: "jamyllemuierdokaio@gmail.com",
        dataNascimento: "02/02/2000"

    }
]
// mapear as rotas e a logica




// exportar o roteador
module.exports = router