var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session:req.session });   
  //session:req.session 입력으로 넘겨주면, index.ejs 에서  <p><%=session["username"]%></p> 문구에서  username  받아와서 출력함.
});

module.exports = router;
