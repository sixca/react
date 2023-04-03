//ejs엔진 활용

let http = require("http");
let fs = require("fs"); // 파일읽기

let ejs = require("ejs");  // npm install ejs 

let server = http.createServer((request, response)=>{

        fs.readFile("./html/test.html", "utf-8", (error,data)=>{
            if(error)
            {
                response.writeHead(500,{'Content-Type':'text/html;charset=utf-8'});
                response.end("error");//오류상황임
                return;
            }
            response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
            //response.end(data); 랜더링 안하면 문자 그대로 나옴 {name}. 랜더링을 해야 값을 가지고 옴.
            response.end(ejs.render(data, {
                name:"Tom",
                age: 23,
                address:"서울시 관악구",
                limit: 10
            }));  //JSON으로 아무거나 보낼 수 있음. name 키값에 "홍길동" 값을 보내줌

            // ejs.render : ejs기반 문서를 html 형태로 전환시켜 반환한다
            //ejs 템플릿 엔진을 통해서  html과 nodejs의 데이터를 결합한다
        })
    });
        server.listen(4000, ()=>{                                 
        console.log("server start http://127.0.0.1:4000");      
});
