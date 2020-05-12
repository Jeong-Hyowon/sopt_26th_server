//1. 배열 선언 실습

var server1 = ["김해리", "손예지", 43, null, true];
var server2 = Array("신윤재", "유가희", 13);
var server3 = new Array("이현주", "조충범", false, undefined);

console.log('server1 : ', server1);
console.log('server2 : ', server2);
console.log('server3 : ', server3);

//2. 배열 추가 실습

server1.push(123); //push이므로 마지막에 추가
server2[server2.length] = "뭐 넣지"; // length이므로 마지막에 추가
server3[99] = "server3의 길이는 얼마일까요?"; //undefined와 앞 문자열 사이에 95개의 empty item이 들어있음

console.log('server1 : ', server1);
console.log('server2 : ', server2);
console.log('server3 : ', server3);

// 3. 배열의 순회 실습
let str1 = 'server1에는 "';
for (var item of server1) {
    str1 += item + ', '; //만약 마지막 , 를 없애고 싶다면 길이로 조정해서 출력?! 파이썬에서는 그랬음,,
}
str1 += '"이 들어있네요 ~';
console.log(str1);

let str2 = 'server2에는 "';
for (var item of server2) {
    str2 += server2[item] + ', ';
}
str2 += '"이(가) 들어있네요 ~';
console.log(str2);

let str3 = 'server3에는 "';
server3.forEach( item => str3 += item + ', ');
str3 += '"이(가) 들어있네요 ~';
console.log(str3);