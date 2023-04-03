//실습 :: url에 따른 문법. 둘다 get방식

var express = require("express");
var app = express();

//http://127.0.0.1:4000/add?x=45&y=7
app.get("/add", (request, response)=>{
        console.log(request.query);
        x = request.query.x,
        y = request.query.y,
        z = parseInt(x)+parseInt(y);
        response.send({x:x, y:y, z:z});
});

//http://127.0.0.1:4000/add/45/7
app.get("/add/:x/:y", (request, response)=>{
    console.log(request.params);
        x = request.params.x,
        y = request.params.y,
        z = parseInt(x)+parseInt(y); 
    response.send({x:x, y:y, z:z});
});

app.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
});

