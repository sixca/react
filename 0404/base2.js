var express = require('express');
var app = express(); // 서버만들었음

app.use((request, response)=>{   
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    response.end("<H1>Express</H1>")      
})

app.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  


//express 모듈의 메서드인 response.send();를 사용하면, response.writehead 구문은 생략해도 된다.
//파일시스템 모듈을 사용하지 않는다면  let fs = require("fs"); 구문도 필요치 않다.
