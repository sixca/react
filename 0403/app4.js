var express = require('express');
var app = express(); 
var ejs = require("ejs");
var fs = require("fs");

app.set("view engine", ejs); //내부변수의 값을 설정한다
app.use(express.urlencoded({extended:false})); //미들웨어를 사용한다  

app.get("/", (request, response)=>{
    fs.readFile("html/index.html", "utf-8", (error, data)=>{
    response.send(data.toString()); // (data)로 하면 오류 뜨곤 함
    });
});

app.use((request, response)=>{   
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    response.end("<H1>Express</H1>");      
});

app.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  
