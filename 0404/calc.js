var express = require('express');
var fs = require("fs");
var ejs = require("ejs");

var app = express();

//bodyParse -- npm install bodyParser를 하고 해야함
//새버전에서는 express가 갖고 있다
//post로 전송할 때 request.body에 보낸 정보를 추가해서
//사용이 간편하도록 도와주는 미들웨어
app.use(express.urlencoded({extended:false}));

app.get("/calcform", (request, response)=>{
    fs.readFile("./html/calcform.html", "utf-8", (err, data)=>{
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.end(ejs.render(data));      
    })
});

app.get("/calc", (request, response)=>{
    let x = parseInt(request.query.x); //input 태그의 name 속성
    let y = parseInt(request.query.y);
    let operator = request.query.operator; //초기화
    if(operator =="1")
        response.send(`${x} + ${y} = ${x+y}`);
    else if (operator == "2")
        response.send(`${x} - ${y} = ${x-y}`);
    else if (operator == "3")
        response.send(`${x} * ${y} = ${x*y}`);
    else 
        response.send(`${x} / ${y} = ${x/y}`);
});

app.use((request, response)=>{   
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    response.end("<H1>Express</H1>")      
})

app.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  
// http://127.0.0.1:4000/calcform

//express 모듈의 메서드인 response.send();를 사용하면, response.writehead 구문은 생략해도 된다.
//파일시스템 모듈을 사용하지 않는다면  let fs = require("fs"); 구문도 필요치 않다.
