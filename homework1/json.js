//1.json 객체 실습

var sopt = {
    name : 'OUR SOPT',
    slogan : 'WE LEAD OUT SOPT',
    part : ['plan', 'design', 'android', 'iOS', 'server'],
    number : 180,
    printName : function () {
        console.log('name : ', this.name)
    },
    printNum : function() {
        console.log('number : ', this.number)
    }
};

console.log('typeof sopt : ' + typeof sopt); //object로 출력

console.log('sopt : ' + sopt); //toString.call()형태로?[]]로 print
console.log('sopt : ', sopt); //{}로 print
console.log('sopt :' + JSON.stringify(sopt)); //{} 딕셔너리 형태로 print (확실X)

sopt.printName();
sopt.number = 190;
sopt.printNum(); //180->190으로 바껴서 출력

// 2.JSON 배열 실습

var dogs = [
    {name: '식빵', family: '웰시코기', age: 1, weight: 2.14},
    {name: '콩콩', family: '포메라니안', age: 3, weight: 2.5},
    {name: '두팔', family: '푸들', age: 7, weight: 3.1}
];

console.log('dogs : ' + dogs);
console.log('dogs : ', dogs);
console.log('dogs :' + JSON.stringify(dogs));

dogs.forEach(
    dog => console.log(dog.name+'이는 종이 '+dog.family+'이고, 나이가 '+dog.age+'세입니다 ~')
); //array 순서대로 출력