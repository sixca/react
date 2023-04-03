//express 모듈을 활용해보자

var express = require('express');
var app = express(); // 서버 만들었음

// express 자체에 use, get, post 함수 3개가 있음
// use - get, post 모두에 응함.
// get - get방식으로 온 것만
// post - post 방식으로 온 것만

// 다른 기능
// response.send, response.json, response.jsonp, response.redirect

 //use("pathname", 콜백함수) :: 변수선언, 파싱도 없이 이렇게 처리 가능
app.use("/test",(request, response)=>{
    response.writeHead(200,{"Content-type":"text/html"});
    response.end("<H1>Test</H1>");
}); 
app.use("/get",(request, response)=>{
    response.writeHead(200,{"Content-type":"text/html"});
    response.end("<H1>GET</H1>");
});
app.get("/userinfo", (req, res)=>{
    let userinfo = {name:"Tom", "phone":"010-0000-0000"};
    res.send( userinfo ); //send함수를 이용해서 JSON데이터 송신. send로 보내기만 했지만, 랜더링 후 JSON 데이터가 출력된다. express 모듈!
})

//http://127.0.0.1:4000/userinfo2?name=Jane&phone=01000000000  //옛날방식
app.get("/userinfo2", (req, res)=>{
    //req.query.name;
    let userinfo = {
        name:req.query.name, 
        phone:req.query.phone
    };
    res.send( userinfo ); //get방식은 query로 받아온다
});

//get방식 - 새롭게 추가된 url방식
//p200 라우팅
//http://127.0.0.1:4000/userinfo3/Brown/user01
app.get("/userinfo3/:username/:userid", (req, res)=>{
    console.log(req.params);
    let userinfo = {
        username:req.params.username, 
        userid:req.params.userid
    };
    res.send( userinfo );
});

app.use("/post",(request, response)=>{
    response.writeHead(200,{"Content-type":"text/html"});
    response.end("<H1>POST</H1>");
});

//다른 url처리 없을 때 처리한다
app.use((request, response)=>{
    response.writeHead(200,{"Content-type":"text/html"});
    response.end("<H1>Express</H1>");
});

app.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
})