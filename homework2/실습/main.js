//함수버전
// const sum = require('./sum');

// var result = sum(1,3);
// console.log("sum result : ", result);

//객체버전
const sumModule = require('./sum');
var result = sumModule.sum(1,3);
console.log("sum result : ", result);