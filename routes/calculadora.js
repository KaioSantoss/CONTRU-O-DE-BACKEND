const express = require('express');
const router = express.Router();

// Soma
router.get('/somar', (req, res) => {
    const numA = Number(req.query.numA);
    const numB = Number(req.query.numB);
    const resultado = numA + numB;
    res.json({ resultado });
});

// Subtração
router.get('/subtrair', (req, res) => {
    const numA = Number(req.query.numA);
    const numB = Number(req.query.numB);
    const resultado = numA - numB;
    res.json({ resultado });
});

// Multiplicação
router.get('/multiplicar', (req, res) => {
    const numA = Number(req.query.numA);
    const numB = Number(req.query.numB);
    const resultado = numA * numB;
    res.json({ resultado });
});

// Divisão
router.get('/dividir', (req, res) => {
    const numA = Number(req.query.numA);
    const numB = Number(req.query.numB);
    if(numB === 0){
        return res.status(400).json({ erro: "Divisão por zero não permitida" });
    }
    const resultado = numA / numB;
    res.json({ resultado });
});

// Ao quadrado
router.get('/aoQuadrado', (req, res) => {
    const num = Number(req.query.num);
    const resultado = num * num;
    res.json({ resultado });
});

// Raiz quadrada
router.get('/raizQuadrada', (req, res) => {
    const num = Number(req.query.num);
    if(num < 0){
        return res.status(400).json({ erro: "Número negativo não permitido" });
    }
    const resultado = Math.sqrt(num);
    res.json({ resultado });
});

module.exports = router;