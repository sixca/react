//서버만들기3

let http = require("http");
let fs = require("fs"); // 파일읽기
let url = require("url"); // url분석을 위한 라이블러

//http:127.0.0.1:4000?name=Tom&age=17

let server = http.createServer((request, response)=>{
    //console.log(request);
    console.log(request.url); // 전송url
    console.log(request.method); // 전송방식
    //이 두가지를 출력해보고 작업해봅시다

    let rurl = request.url;   //현재 요청된 url을 담고
    let query = url.parse(rurl, true).query;  //  url.parse 함수를 사용하여 URL을 파싱하고 URL의 각 부분을 객체로 분리합니다. 이 객체에는 URL의 프로토콜, 호스트, 포트, 경로 등이 포함됩니다.
    //url.parse(rurl, true) 함수는 URL을 파싱하는 Node.js의 내장 모듈인 url 모듈을 사용:: URL 문자열(rurl)을 분석하고 객체로 반환하는 문법(querystring 모듈을 사용하는 문법이며,, querysting 모듈은 url에서 '?' 이후 나오는 쿼리 문자열을 객체 형태로 파싱하는 기능을 제공함)
    //  이 코드에서는 파싱된 URL의 query 속성을 추출합니다. 이 속성은 URL 쿼리 문자열에서 추출된 파라미터들의 객체입니다.
    //string 분석 -> json객체로 전환
    //파싱한다
    console.log(query);
    if(query.name!=""){
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.end(`이름: ${query.name} 나이:${query.age}`); // query 객체 내 프로퍼티를 웹에 출력
    }
});

server.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});


/*
파싱(Parsing)은 문자열을 분석하여 의미 있는 조각으로 나누는 작업을 의미
url.parse 함수는 주어진 URL 문자열을 다양한 부분으로 분리하여 객체로 반환함.

protocol: URL의 프로토콜(http, https 등)을 나타내는 문자열
host: URL의 호스트(도메인)를 나타내는 문자열
port: URL의 포트번호를 나타내는 숫자
pathname: URL의 경로를 나타내는 문자열
query: URL의 쿼리 문자열을 나타내는 문자열

또한, url.parse 함수의 두 번째 매개변수로 true를 전달하면 URL의 query 속성 값을 querystring 모듈을 사용하여 파싱한다.
이렇게 파싱된 query 객체는 각 쿼리 문자열 파라미터의 이름과 값을 저장합니다. (url 내에 ? 이후 키:값을 가져옴)
따라서 url.parse(rurl, true)는 URL 문자열을 파싱하여 다양한 부분으로 분리하고, 쿼리 문자열 파라미터를 객체 형태로 저장하는 작업을 수행
=======
//서버만들기3

let http = require("http");
let fs = require("fs"); // 파일읽기
let url = require("url"); // url분석을 위한 라이블러

//http:127.0.0.1:4000?name=Tom&age=17

let server = http.createServer((request, response)=>{
    //console.log(request);
    console.log(request.url); // 전송url
    console.log(request.method); // 전송방식
    //이 두가지를 출력해보고 작업해봅시다

    let rurl = request.url;   //현재 요청된 url을 담고
    let query = url.parse(rurl, true).query;  //  url.parse 함수를 사용하여 URL을 파싱하고 URL의 각 부분을 객체로 분리합니다. 이 객체에는 URL의 프로토콜, 호스트, 포트, 경로 등이 포함됩니다.
    //url.parse(rurl, true) 함수는 URL을 파싱하는 Node.js의 내장 모듈인 url 모듈을 사용:: URL 문자열(rurl)을 분석하고 객체로 반환하는 문법(querystring 모듈을 사용하는 문법이며,, querysting 모듈은 url에서 '?' 이후 나오는 쿼리 문자열을 객체 형태로 파싱하는 기능을 제공함)
    //  이 코드에서는 파싱된 URL의 query 속성을 추출합니다. 이 속성은 URL 쿼리 문자열에서 추출된 파라미터들의 객체입니다.
    //string 분석 -> json객체로 전환
    //파싱한다
    console.log(query);
    if(query.name!=""){
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.end(`이름: ${query.name} 나이:${query.age}`); // query 객체 내 프로퍼티를 웹에 출력
    }
});

server.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});


/*
파싱(Parsing)은 문자열을 분석하여 의미 있는 조각으로 나누는 작업을 의미
url.parse 함수는 주어진 URL 문자열을 다양한 부분으로 분리하여 객체로 반환함.

protocol: URL의 프로토콜(http, https 등)을 나타내는 문자열
host: URL의 호스트(도메인)를 나타내는 문자열
port: URL의 포트번호를 나타내는 숫자
pathname: URL의 경로를 나타내는 문자열
query: URL의 쿼리 문자열을 나타내는 문자열

또한, url.parse 함수의 두 번째 매개변수로 true를 전달하면 URL의 query 속성 값을 querystring 모듈을 사용하여 파싱한다.
이렇게 파싱된 query 객체는 각 쿼리 문자열 파라미터의 이름과 값을 저장합니다. (url 내에 ? 이후 키:값을 가져옴)
따라서 url.parse(rurl, true)는 URL 문자열을 파싱하여 다양한 부분으로 분리하고, 쿼리 문자열 파라미터를 객체 형태로 저장하는 작업을 수행

*/