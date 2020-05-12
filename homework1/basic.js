// 1.변수 재선언 실습
var vv = 123;
var vv = 321;
console.log("vv : ", vv);

let ll = 123;
//let ll = 321; -> 재선언안됨
console.log("ll : ", ll);

const cc = 123;
//const cc = 321; -> 재선언안됨
console.log("cc : ", cc);

// 2.변수 재할당 실습
var vv = 'abc';
vv = 'def';
console.log("vv : ", vv); //def로 나옴

let ll = 'abc';
ll = 'def';
console.log("ll : ", ll); //def로 나옴

const cc = 'abc';
// cc = 'def'; // 재할당 안됨
console.log("cc : ", cc); //abc로 나옴

// 3. 변수 초기화 실습
var vv;
console.log("vv : ", vv); //undefined로 나옴

let ll;
console.log("ll : ", ll); //undefined로 나옴

// const cc;
// console.log("cc : ", cc); //초기화 에러