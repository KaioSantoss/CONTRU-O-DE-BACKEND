const calc = require('./calculadora');

console.log("===== Calculadora =====");

console.log("Somar 100 + 100 =", calc.somar(100, 100));
console.log("Subtrair 20 - 10 =", calc.subtrair(20, 10));
console.log("Multiplicar 10 * 10 =", calc.multiplicar(10, 10));
console.log("Dividir 10 / 2 =", calc.dividir(10, 2));
console.log("Ao Quadrado (8) =", calc.aoQuadrado(8));
console.log("Raiz Quadrada (50) =", calc.raizQuadrada(50));
