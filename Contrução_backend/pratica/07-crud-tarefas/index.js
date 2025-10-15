const express = require('express')
const mongoose = require('mongoose')
const dotent =('dotenv')

const app = express()

app.use(express.json())

//Conectar no banco mongo

mongoose.connect('mongodb+srv://kaiosantos:migas1478@cluster0.mrqduik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Conectado ao MongoDB")
    })

    .catch(err => {
        console.log("Erro ao conectar no Banco MongoDB: ", err)
    })

app.listen(3000, () => {
    console.log("Aplicação rodando em http://localrost:3000")
})
