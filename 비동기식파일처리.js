//비동기식 파일 처리 (Asynchronous)
let fs = require("fs");

//비동기식, 파일을 읽기 전에 함수가 반환되어서 반환값을 사용할 수 없다
//콜백함수를 3번째 매개변수로 전달한다
fs.readFile("./hello.js", "utf-8", (err, data)=>{
    //이 함수는 파일을 모두 읽은 후 시스템에 의해 호출된다.
    console.log(data);
})

console.log("프로그램 완료");

//비동기식 파일 처리 (Asynchronous)
let fs = require("fs");

//비동기식, 파일을 읽기 전에 함수가 반환되어서 반환값을 사용할 수 없다
//콜백함수를 3번째 매개변수로 전달한다
fs.readFile("./hello.js", "utf-8", (err, data)=>{
    //이 함수는 파일을 모두 읽은 후 시스템에 의해 호출된다.
    console.log(data);
})

console.log("프로그램 완료");

//"프로그램완료"가 최상단에 호출됨..  this is 비동기식 처리