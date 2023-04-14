let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil"); // 또 추가

/* GET home page. */
router.get('/list/:pg', async function(req, res, next) {
  let pg = parseInt(req.params.pg);
  //pg=1 0 (pg-1)*10  0
  //pg=2 10 (2-1)*10  10
  //pg=3 20 (3-1)*10  20

  let sql = `
            SELECT count(*) cnt
            FROM tb_board A
            LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
            LEFT OUTER JOIN tb_member C ON A.writer=C.userid            
`;    // 전체 데이터 갯수 확인
  let results = await commonDB.mysqlRead(sql, []);
  let totalCnt = results[0]["cnt"];

  sql = `SELECT A.id, A.title, A.writer, A.num, A.username,
        date_format(A.wdate, '%Y-%m-%d') wdate
        from
        (
        select A.id, A.title, A.writer, A.wdate , C.username, @rownum:=@rownum +1 num
        from tb_board A
        LEFT OUTER JOIN (Select @rownum:=0) B ON 1=1
        LEFT OUTER JOIN tb_member C ON A.writer = C.userid
        order by id
        ) A
        limit ${(pg - 1) * 10}, 10
`; // data 가져오기

  results = await commonDB.mysqlRead(sql, []);
  console.log( results );
  res.render('board/board_list', {session:req.session
                                  , boardList : results
                                  , totalCnt:totalCnt
                                  , pg:pg
                                  , paging:commonUtil.getPaging(pg, totalCnt)  // commonUtil.js 에서 작성한 메서드 활용
    }); //보내고 싶은 데이터들을 여기 쭉 쓰면
});

//글 상세보기
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
