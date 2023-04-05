var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("ajaxtest");
});

// http://127.0.0.1:3000/ajax/ajaxtest1 // 웹페이지 출력
router.get('/ajaxtest1', function(req, res, next) {
  res.render("ajax/ajaxtest1");
});

router.get('/ajaxtest2', function(req, res, next) {
  res.render("ajax/ajaxtest2");
});

router.get('/ajaxscore', function(req, res, next) {
  res.render("ajax/ajaxscore");
});

router.use('/add', function(req, res, next){
  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x + y;
  res.json({result:z});
});

router.use('/calc', function(req, res, next){
  let name = req.query.name; 
  let kor = parseInt(req.query.kor);
  let eng = parseInt(req.query.eng);
  let mat = parseInt(req.query.mat);
  
    if(0 > kor || kor > 100 || 0 > eng || eng > 100 || 0 > mat || mat > 100){
      res.send();
      return false;
  } else {
    total = kor + eng + mat;
    avg = Math.round((kor + eng + mat)/3);    
  }
  result = `${name}님의 총점은 ${total}점이고 평균은 ${avg}점입니다`;
  res.json({result:result}); 
});

// send 함수가 적당히 알아서 데이터를 보낸다
router.get('/result1', function(req, res, next) {
  res.send("data만 보낸다");
});

module.exports = router;
