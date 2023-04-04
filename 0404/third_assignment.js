var express = require('express');
var fs = require("fs");
var ejs = require("ejs");

var app = express();

//app.use(express.urlencoded({extended:false}));

app.get("/input", (request, response)=>{
    fs.readFile("./html/third_assignment.html", "utf-8", (err, data)=>{
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.end(ejs.render(data));      
    })
});

app.get("/calc", (request, response)=>{
    let name = request.query.name; 
    let ko = parseInt(request.query.ko);
    let eng = parseInt(request.query.eng);
    let mat = parseInt(request.query.mat);

    if(0 > ko || ko > 100){
        response.send("점수를 0~100사이 숫자로 입력하세요");
        return false;
    } else if (0 > eng || eng > 100){
        response.send("점수를 0~100사이 숫자로 입력하세요");
        return false;
    } else if (0 > mat || mat > 100){
        response.send("점수를 0~100사이 숫자로 입력하세요");
        return false;
    } else {
        total = ko + eng + mat;
        avg = Math.round((ko + eng + mat)/3);    
    }
    
    response.send(`${name}님의 총점은 ${total}점이고 평균은 ${avg}점입니다`);
});

app.get("/clearCalc", (request, response)=>{
    request.query.name = ""; 
    request.query.ko = "";
    request.query.eng = "";
    request.query.mat = "";
});

app.use((request, response)=>{   
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    response.end("<H1>로얄 성적 계산기</H1>")      
})

app.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  

//http://127.0.0.1:4000/input
//express 모듈의 메서드인 response.send();를 사용하면, response.writehead 구문은 생략해도 된다.
//파일시스템 모듈을 사용하지 않는다면  let fs = require("fs"); 구문도 필요치 않다.
