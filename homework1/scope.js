function funcScope() {
    var v1 = 123;
    if (true) {
        var v2 = 123;
        let ll = 'abc';
        console.log('let은 Block Scope, ll : ', ll); //abc출력
    }
    // console.log('let은 Block Scope, ll : ', ll); //오류
    console.log('var은 function Scope, v2 : ', v2); //123출력
}
funcScope();
//console.log('var은 function Scope, v1 : ', v2); //오류