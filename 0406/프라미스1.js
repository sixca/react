let promise = new Promise((resolve, reject)=>{
    //여기서 시간이 많이 걸리는 코드를 둔다.
    //성공하면 resolve(전달 할 데이터) => then에 콜백함수의 매개변수로 전달된다.
    //resolve("success");
    reject("error");
})
.then( (result)=>{
    console.log("then", result);
})
.catch( (error)=>{
    console.log("catch", error);
})