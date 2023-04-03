//express 모듈을 활용한 구구단 출력하기

//http://127.0.0.1:4000/gugu?dan=4

var express = require('express');
var app = express(); 


app.get("/gugu", (request, response)=>{
    console.log(request.query);
    dan = parseInt(request.query.dan);
    result = `${dan}단<br>`;

    for (i=1; i<10; i++){
        z = dan * i;
        result += `${dan} * ${i} = ${z}<br>`;
    }
        response.send(result);
});

app.listen(4000, ()=>{
console.log("server start http://127.0.0.1:4000");
});
