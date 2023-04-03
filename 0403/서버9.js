//jade 엔진을 활용해보자

let http = require("http");
let fs = require("fs");

let jade = require("jade"); // npm install jade

let server = http.createServer((request, response)=>{   
    fs.readFile("html/test1.jade", "utf-8", (error, data)=>{

        let fn = jade.compile(data); //Jade 코드를 JavaScript 함수로 컴파일하는 함수. 

        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.end(fn({name: "jade"}));      
    });
})

server.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  