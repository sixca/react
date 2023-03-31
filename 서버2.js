//서버만들기2 포트바꿀겁니다.


let http = require("http");

let server = http.createServer((request, response)=>{   
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'}); //;charset=utf-8 추가해서 한글을 표시되도록.. 
    response.end("<H1>두번째 서버입니다</H1>")      
})

server.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  

//서버만들기2 포트바꿀겁니다.


let http = require("http");

let server = http.createServer((request, response)=>{   
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'}); //;charset=utf-8 추가해서 한글을 표시되도록.. 
    response.end("<H1>두번째 서버입니다</H1>")      
})

server.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  

//npm install nodemon