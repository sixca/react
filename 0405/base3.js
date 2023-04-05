var express = require('express');
var app = express(); 
var ejs = require("ejs");
app.set("view engine", ejs);
app.use(express.urlencoded({extended:false}));

app.use((request, response)=>{   
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    response.end("<H1>Express</H1>")      
})

app.listen(4000, ()=>{                                 
    console.log("server start http://127.0.0.1:4000");      
});  

