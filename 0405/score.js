var express = require('express');
var app = express(); 
var ejs = require("ejs");
app.set("view engine", ejs);
app.use(express.urlencoded({extended:false}));

let scoreData = [
    {id:1, name:"홍길동", kor:90, eng:80, mat:100}
]; //DB가 없으니 데이터로 사용

//url은 서버 전체에서 유일 score/list
app.get("/score/list", (req, res)=>{
    //views/score/score_list.ejs
    //첫번째 매개변수 : html파일
    //두번째 매개변수 : 데이터를 JSON 형태로 전달해야 한다
    res.render("score/score_list.ejs", {scoreList : scoreData})
});

app.get("/score/view/:id", (req, res)=>{
    let id = req.params.id;
    //filter 조건을 만족하는 모든 데이터셋(배열)
    //find는 조건을 만족하는 첫번째 데이터만(배열 아님)
    let scoreItem = scoreData.find(score=>score.id==id);
    res.render("score/score_view.ejs", {score:scoreItem});
});

app.get("/score/write", (req, res)=>{
    res.render("score/score_write.ejs");
});

app.post("/score/save", (req, res)=>{
    let name = req.body.name;
    let kor = parseInt(req.body.kor);
    let eng = parseInt(req.body.eng);
    let mat = parseInt(req.body.mat);
    let id = 0; // 젤 마지막에 있는 데이터의 id+1해야한다
    id = scoreData[scoreData.length-1].id+1;
    //JSON으로 데이터를 만들어서 배열에 추가한다
    let data = {id:id, name:name, kor:kor, eng:eng, mat:mat};
    scoreData.push(data);
    //redirect함수를 이용해서 /score/list를 호출
    res.redirect("/score/list");
}) ;

app.use("/", (request, response)=>{   
    response.render("index.ejs");      
}); // 추가

app.use((request, response)=>{   
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    response.end("<H1>404 Error</H1>")      
}); // 없는 url에 접속한 것이니 404 에러임

app.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  



// http://127.0.0.1:4000/score/list