let asyncFunc1 = (msg) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`func1 : ${msg}`)
        }, 1000)
    })

let asyncFunc2 = (msg) => 
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(`func2 : ${msg}`)
        }, 1000)
    })

function promiseMain() {
    asyncFunc1('Hello').then((result)=> {
        console.log(result)
        return asyncFunc2('world')
    }).then((result) => {
        console.log(result)
    })
}

async function asyncMain() {
    let result = await asyncFunc1('Hello')
    console.log(result)
    result = await asyncFunc2('world')
    console.log(result)
}
/*await을 빼면 pending 상태로 출력*/

promiseMain()
asyncMain()

/*출력은 promiseMain()와 asyncMain()가 똑같이 시간차를 두고 
func1 : Hello
func2 : world
로 출력됨 
만약 promiseMain()와 asyncMain()를 동시에 실행하면
func1 : Hello
func1 : Hello
func2 : world
func2 : world
로 출력됨*/