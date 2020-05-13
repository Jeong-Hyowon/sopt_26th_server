function task1(){
    setTimeout(()=>{
        console.log('task1');
    }, 0);
}

function task2(){
    console.log('task2');
}

function task3(){
    console.log('task3');
}

task1();
task2();
task3();
//setTimeout을 설정해놓은 task1()이 0초로 설정해놔도 제일 마지막에 실행