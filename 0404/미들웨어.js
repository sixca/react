//미들웨어.. 거쳐가는 중간길

var express = require('express');
var app = express(); // 서버만들었음

// 첫번째 미들웨어
app.use((request, response, next)=>{
    //request 브라우저 -> 서버
    //response 서버 -> 브라우저
    //next - 다음 함수를 호출한다
    request.name = "홍길동";
    response.name = "John";
    console.log("aaaaaa");
    next();
})

// 두번째 미들웨어
app.use((request, response, next)=>{
    console.log("bbbbbb");
    request.phone = "010-0000-0001";
    response.address = "서울시 영등포구";
    next();
})

// 세번째 미들웨어
app.use((request, response)=>{   
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    console.log(request.name);
    console.log(response.name);
    console.log(request.phone);
    console.log(response.address);

    response.end(`<H1>${request.name}</H1>`);      
})

app.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  

// response, request 둘다 JSON이니 아무거나 넣어주고 싶은 것 넣어주면 된다.