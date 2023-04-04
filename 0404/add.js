//input-login 참고하여, addform-add 예제 실습

var express = require('express');
var fs = require("fs");
var ejs = require("ejs");
var app = express();
app.use(express.urlencoded({extended:false}));

app.get("/addform", (request, response)=>{
    fs.readFile("./html/addform.html", "utf-8", (err, data)=>{
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.end(ejs.render(data));   
           
    })
});

app.get("/add", (request, response)=>{  //html과 /add로 연결됨
    let x = parseInt(request.query.x); 
    let y = parseInt(request.query.y);
    response.send(`${x} + ${y} = ${x + y}`);
});

app.use((request, response)=>{   
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    response.end("<H1>프리미엄 계산기</H1>")      
})

app.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  
