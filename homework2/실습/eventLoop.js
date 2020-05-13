function greet(){
    console.log('Hello!');
}

function timer(){
    return setTimeout(() => {
        console.log('End!');
    }, 3000);
}

greet();
timer();
//greet() 실행하고 3초 후에 timer() 실행