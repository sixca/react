let express = require('express');  // 경로지정 안 한 것은 node_modules폴더에 있는 것
let router = express.Router();
let commonDB = require("./commonDB");  // 같은 폴더에있다 == ./

router.get('/', function(req, res, next) {
    res.render('member/member_register', {title: 'Express'});
  });

  //아이디중복체크 --- 클라이언트로부터 아이디를 받음 
  //                  받아온 아이디를 DB에 가서 존재하는지 유무확인
  //                  존재하면 fail 사용자에게 보여주고, 존재하지 않아서 사용가능하면 success 반환하도록
router.use('/idcheck', async function(req, res, next){
    let userid = req.body.userid; //사용자단에서 userid를 보내라는 말
    sql = `select count(*) cnt from tb_member where userid='${userid}'`;
    let rows = await commonDB.mysqlRead(sql);
    let cnt = rows[0]["cnt"];
    if(cnt == 0)
      res.json({"result": "success"}); // 아이디가 존재하면 success
    else
      res.json({"result":"fail"}); // 그 외에는 fail
  });  

  //닉네임 중복체크
  router.use('/nickcheck', async function(req, res, next){
    let nickname = req.body.nickname;
    sql = `select count(*) cnt from tb_member where nickname='${nickname}'`;
    let rows = await commonDB.mysqlRead(sql);
    let cnt = rows[0]["cnt"];
    if(cnt == 0)
      res.json({"result": "success"}); 
    else
      res.json({"result":"fail"});
  });

  //SAVE :: 회원가입등록  , /member/save
  router.use('/save', async function(req, res, next){
    let userid = req.body.userid;
    let password = req.body.password;
    let username = req.body.username;
    let email = req.body.email;
    let phone = req.body.phone;
    let zipcode = req.body.zipcode;
    let address1 = req.body.address1;
    let address2 = req.body.address2;
    let nickname = req.body.nickname;
    console.log(username);
    console.log(nickname);
    let sql = `insert into tb_member (userid, password, username, email, phone, nickname, zipcode, address1, address2, wdate) 
    values(?,?,?,?,?,?,?,?,?,now())`;
  try{
    await commonDB.mysqlRead(sql, [userid, password, username, email, phone, nickname, 
      zipcode, address1, address2, ]);
    res.json({result:"success"});
  }
  catch(e)
  {
    console.log(e);
    res.json({result:"fail"});
  }
});

// member/logon
  router.use('/logon', async function(req, res, next){
    res.render("member/member_logon");
  });

// 세션에 저장하기
  router.get('/put', async function(req, res, next){
    let userid = req.query.userid;
    req.session["userid"] = userid;
    res.redirect("/");
    console.log(req.session["userid"]);
  });


//로그인 성공&실패 적용 by kwon
router.use('/logoncheck', async function(req, res, next){
  let userid = req.body.userid;
  let password = req.body.password;
  sql = `select userid, password from tb_member where userid='${userid}'`;
  let rows = await commonDB.mysqlRead(sql);
  
  let inputValue = rows[0]["userid", "password"];
    if(rows[0] && rows[0].password === password) {
      res.json({"result": "success"}); 
    } else { // 그렇지 않으면 로그인 실패
      res.json({"result":"fail"});
    }
});

module.exports = router;
