//post 방식
//보내실 때 postman으로 보내셔야 합니다

var express = require('express');
var app = express(); 
//bodyParse 모듈이 있는데 모듈을 설치하고 => express자체적으로
//body에 데이터를 가져온다
app.use(express.urlencoded({extended:false}));  
// 전문용어로 '미들웨어'라고 합니다. post방식인 경우 이 코드 선행 필수!
// app객체 만들고, 다른 url 처리 전에만 호출되면 된다

//http://127.0.0.1:4000/add
app.post("/add", (request, response)=>{
    let x = request.body.x;
    let y = request.body.y;
    let z = parseInt(x) + parseInt(y);

    response.send({x:x, y:y, z:z});

});

app.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  

// get 방식의 경우1 ?x=4&y=5 request.query.x
// get 방식의 경우2 /4/5 request.params.x

// post 방식의 경우 app.use(express.urlencoded({extended:false}));
// 가 선행되고 나면 request.body.x로 처리한다.

