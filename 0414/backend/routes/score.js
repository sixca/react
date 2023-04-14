var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB2');

/* GET home page. */
//http://localhost:9090/score/list

//get 방식으로 조회. SELECT
router.get('/list', async function(req, res, next) {
  let sql = `
      SELECT A.id, A.user_name, A.kor, A.eng, A.mat 
      FROM tb_score A;
  `;

  let results = await commonDB.mysqlRead(sql,[]);
  res.json(results);
   
});

//post방식으로 INSERT
router.post('/write', async function(req, res, next) {
  try
  {
    let user_name = req.body.user_name;
    let kor = req.body.kor;
    let eng = req.body.eng;
    let mat = req.body.mat;
    let sql = `
        INSERT INTO tb_score (user_name, kor, eng, mat) 
        VALUES(?, ?, ?, ?)
    `;
    await commonDB.mysqlRead(sql,[user_name, kor, eng, mat]);
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
        select * from tb_score where id=${id}
    `;
    let results = await commonDB.mysqlRead(sql,[]);
    res.json({"result":"success", score: results[0] });
  }
  catch(e)
  {
    console.log(e);
    res.json({"result":"fail"});
  }
})


module.exports = router;
