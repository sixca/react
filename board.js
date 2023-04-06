var express = require('express');
var app = express(); 
var ejs = require("ejs");
var fs = require("fs");

//ejs엔진은 views 폴더 아래서 파일을 검색한다
app.set("view engine", ejs);

app.use(express.urlencoded({extended:false}));

let boardList = [
    {id:1, title:"제목1", writer:"작성자1", wdate:"2023-04-04"},
    {id:2, title:"제목2", writer:"작성자2", wdate:"2023-04-05"},
    {id:3, title:"제목3", writer:"작성자3", wdate:"2023-04-06"},
    {id:4, title:"제목4", writer:"작성자4", wdate:"2023-04-07"},
    {id:5, title:"제목5", writer:"작성자5", wdate:"2023-04-08"},
]

app.use("/board/list", (request, response)=>{
    response.render("board/board_list.ejs", {boardList:boardList});
}); // 

app.use("/board/view/:id", (request, response)=>{
    let id = request.params.id;
    item = boardList.filter(x=>x.id==id); // 배열의 조건식
    response.render("board/board_view.ejs", {item:item[0]});
});

// 페이지만 이동한다. board_write.ejs로 이동만 한다.
app.use("/board/write", (request, response)=>{
    response.render("board/board_write.ejs");
});

//저장하기
app.use("/board/save", (request, response)=>{
    let title = request.body.title;
    let contents = request.body.contents;
    let writer = request.body.writer;
    let id = boardList.length+1;
    let now = new Date();
    let wdate = now.toLocaleDateString('ko-KR');
    boardList.push({id:id, title:title, contents:contents, writer:writer, wdate:wdate});
    response.redirect("/board/list"); //응답을 이쪽으로 옮겨라! 강제이동. 이런 방법으로 호출해야해요. 함수를 직접 호출하면 안 돼요. 
});
//response.redirect() 함수는 HTTP 요청을 다른 URL로 리다이렉트하는 메서드
//"/board/save" URL로 POST 요청이 왔을 때, boardList라는 배열에 새로운 게시물 정보를 추가하고, "/board/list" URL로 리다이렉트하는 기능을 수행


app.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  

// http://127.0.0.1:4000/board/list