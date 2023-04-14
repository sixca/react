var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB');

/* GET home page. */
//http://localhost:9090/hero/list

//get 방식으로 조회. SELECT
router.get('/list', async function(req, res, next) {
  let sql = `
      SELECT A.id, A.hero_name, A.hero_desc, date_format(A.wdate, '%Y-%m-%d') wdate 
      FROM tb_hero A;
  `;

  let results = await commonDB.mysqlRead(sql,[]);
  res.json(results);
   
  // res.json(
  //   [
  //     {id:1, name:"이순신", descr:"임진왜란승리"},
  //     {id:2, name:"강감찬", descr:"귀주대첩"},
  //     {id:3, name:"을지문덕", descr:"살수대첩"},
  //     {id:4, name:"세종대왕", descr:"한글창제"},
  //     {id:5, name:"문종", descr:"자격루"},
  //   ]
  // )
});

//post방식으로 INSERT
router.post('/write', async function(req, res, next) {
  try
  {
    let hero_name = req.body.hero_name;
    let hero_desc = req.body.hero_desc;
    let sql = `
        INSERT INTO tb_hero (hero_name, hero_desc, wdate) 
        VALUES(?, ?, NOW())
    `;
    await commonDB.mysqlRead(sql,[hero_name, hero_desc]);
    res.json({"result":"success"});
  }
  catch(e)
  {
    console.log(e);
    res.json({"result":"fail"});
  }
})  // postman에서 키&값을 넣어보고 success 확인하고, 테이블 확인해보면 값이 들어가있음을 확인.

//hero 리스트에서 해당 id 내용 상세보기
// http://localhost:9090/hero/view/1
router.get('/view/:id', async function(req, res, next) {
  try
  {
    let id = req.params.id;   //URL의 파라미터를 가져오는 것이니 params
    let sql = `
        select * from tb_hero where id=${id}
    `;
    let results = await commonDB.mysqlRead(sql,[]);
    res.json({"result":"success", hero: results[0] });
  }
  catch(e)
  {
    console.log(e);
    res.json({"result":"fail"});
  }
})

router.post('/update', async function(req, res, next) {
  try
  {
    let id = req.body.id;  //클라이언트에서 서버로 보내는 바디를 가져오니 body 
    let hero_name = req.body.hero_name;
    let hero_desc = req.body.hero_desc;
    let sql = `
        update tb_hero set hero_name=?, hero_desc=? where id=?
    `;
    await commonDB.mysqlRead(sql,[hero_name, hero_desc, id]);
    res.json({"result":"success"});
  }
  catch(e)
  {
    console.log(e);
    res.json({"result":"fail"});
  }
})

module.exports = router;
