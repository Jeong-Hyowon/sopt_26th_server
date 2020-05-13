const calculatorModule = require('./mission_calculator.js');

var add = calculatorModule.add(1,3);
var subtract = calculatorModule.subtract(3,1);
var multiply = calculatorModule.multiply(1,3);
var divide = calculatorModule.divide(10,2);
console.log("add result : ", add);
console.log("subtract result : ", subtract);
console.log("multiply result : ", multiply);
console.log("divide result : ", divide);