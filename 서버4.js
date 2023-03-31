//서버만들기4

let http = require("http");
let fs = require("fs"); // 파일읽기
let url = require("url"); // url분석을 위한 라이블러

//http:127.0.0.1:4000/add?x=4&y=5
//http:127.0.0.1:4000/sub?x=4&y=5
//http:127.0.0.1:4000/userinfo?userid=test&username=Tom


let server = http.createServer((request, response)=>{
    //console.log(request);
    //console.log(request.url); 
    console.log(request.method);  //get

    let rurl = request.url;  
    let pathname = url.parse(rurl, true).pathname; //add
    let query = url.parse(rurl, true).query;

    console.log(query);
    console.log(pathname);
    console.log(typeof(query));

    if(pathname =="/add"){
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        // let x = parseInt(query.x);
        // let y = parseInt(query.y);
        // let z = x+y;  parseInt하지 않아도 정상 출력됩니다.
        response.end(`${query.x} + ${query.y} = ${query.x + query.y}`); 
    }
    else if(pathname =="/sub"){
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.end(`${query.x} - ${query.y} = ${query.x - query.y}`)
    }
    else if(pathname =="/userinfo"){
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.end(`userid : ${query.userid} , username : ${query.username}`)
    } 
    else
    {
        response.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
        response.end("<h1>존재하지 않는 url입니다</h1>"); 
    }
});

server.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});
