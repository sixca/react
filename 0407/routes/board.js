let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let sql = `
          select id, title, writer, 
          contents, date_format(wdate, '%Y-%m-%d') wdate
          from tb_board
  `;    

  let results = await commonDB.mysqlRead(sql, []);
  res.render('board/board_list', { boardList : results });
});

router.get('/view/:id', async function(req, res, next) { // /view가 뜬금없이 나온 것은.. view engine에서 라우팅 경로를 미리 정의해둔 키워드인듯함.
  let id = req.params.id; // id 변수 설정
  let sql = `
            select id, title, writer, 
            contents, date_format(wdate, '%Y-%m-%d') wdate, hit, contents
            from tb_board where id=${id}
  `;    
  // select * from tb_board where id=${id}
  // select * from tb_board where id=?, [id]
  let boardItem = await commonDB.mysqlRead(sql, [id]);
  console.log(boardItem);
  res.render('board/board_view', { board : boardItem[0]});
});

router.get('/board_write', async function(req, res, next) {
  res.render('board/board_write');
});

module.exports = router;
