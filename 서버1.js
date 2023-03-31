//서버만들기
//Node.js의 http 모듈을 사용하여 웹 서버를 만들고 실행하는 간단한 예제

let http = require("http"); // http모듈을 불러온다.

http.createServer((request, response)=>{ //createServer()메서드로 서버 객체를 만든다. 콜백함수 request, response 객체를 인수로 받음.  
    response.writeHead(200,{'Content-Type':'text/html'});  //클라이언트가 서버에 요청을 보낼 때마다 실행. 응답(response) 객체를 사용하여 클라이언트로 HTML 문서를 반환   *클라이언트(client)란? : 서버(server)로부터 서비스나 자원을 요청하는 컴퓨터 시스템 또는 프로그램
    response.end("<H1>Hello my first Webserver</H1>")       //response.writeHead() 메소드를 사용하여 응답 헤더를 설정합니다. 여기서는 200 상태 코드와 Content-Type을 text/html로 설정하였습니다. 상태 코드 200은 요청이 성공적으로 처리되었다는 것을 의미합니다.
}).listen(3000, function(){                                 //response.end() 메소드를 사용하여 응답 본문을 전송합니다. 여기서는 HTML 태그를 포함하는 문자열을 클라이언트로 반환하고 있습니다.
    console.log("server start http://127.0.0.1:3000");      //listen() 메소드를 사용하여 서버를 시작합니다. 이 메소드는 포트 번호와 서버가 시작될 때 실행될 콜백 함수를 인수로 받습니다. 
});  //이 예제에서는 포트 번호 3000을 사용하고 있으며, 서버가 시작될 때 콘솔에 메시지를 출력하도록 설정되어 있음 
//따라서 이 코드는 웹 서버를 시작하고, 클라이언트가 서버에 요청을 보낼 때마다 "Hello my first Webserver" 라는 메시지를 반환