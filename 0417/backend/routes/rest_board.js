//rest_board.js  >> board.js를 수정해서 render를 json으로 받아본다
//https://songhee96.tistory.com/27 multer 설명 잘 나온 블로그

let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil"); // 또 추가

//npm install murter : nodejs에서 파일 업로드를 담당하는 모듈
var multer = require("multer");
let path = require("path"); //파일이나 디스크 관리 모듈, 주로 경로
//파일을 업로드하는데 필요한 정보를 설정해야 한다
let storage = multer.diskStorage({   //이 함수에 json을 넣은것
    destination:function(req, file, cb){        //destination은 내장으로 존재하는 키
      cb(null, "uploads/board");
      //cd - 파일업로드시 이 함수가 호출된다.
    },
    filename:function(req, file, cb){
      //new Data => 현재 날짜와 시간, 분초까지 알아온다. => valueOf() 문자열로 변경
      //본래 파일명이 중복날 가능성이 있어서 별도의 파일명을 부여한다
      //확장자는 본래파일명으로 해야 한다.
      //path.extname(파일명) - 파일의 확장자를 가져온다.
      //두번째 인자인 file이 업로드되는 파일인데 이 파일의 originalfilename에 원래 파일명이 있다.
      let newFilename = new Date().valueOf()+path.extname(file.originalname);
      cb(null, newFilename);
    }
});
let upload = multer({storage:storage});
// let upload = multer({
//   // limits: limits,     //업로드 제한
//   // fileFilter: fileFilter,   //파일 제한
// }); 

//제한
const limits = {
    fieldNameSize: 200, //필드명 사이즈 최대값
    filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};

//확장자 필터
const fileFilter = (req, file, callback) => {
  const typeArray = file.mimetype.split("/");
  const fileType = typeArray[1];

  if (fileType == "jpg" || fileType == "jpeg" || fileType == "png") {
    callback(null, true);
  } else {
    return callback(null, false);
  }
};


/* http://localhost:9090/rest_board/list -- 안됨 */
/* http://localhost:9090/rest_board/list/1 -- 연결 */
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
        , A.filename, A.filelink
        from
        (
        select A.id, A.title, A.writer, A.wdate , C.username
        ,A.filename, A.filelink
        , @rownum:=@rownum +1 num
        from tb_board A
        LEFT OUTER JOIN (Select @rownum:=0) B ON 1=1
        LEFT OUTER JOIN tb_member C ON A.writer = C.userid
        order by id
        ) A
        limit ${(pg - 1) * 10}, 10
`; // data 가져오기

  results = await commonDB.mysqlRead(sql, []);
  console.log( results );
  res.json({ boardList : results, totalCnt:totalCnt, pg:pg}); //응답완료
  //한 함수내에서 res.json 호출하고 또 다시 res.send나 render나 json 호출 못한다
});

//http://localhost:9090/rest_board/view/2
//글 상세보기
router.get('/view/:id', async function(req, res, next) { 
  let id = req.params.id; 
  let sql = `
            select A.id, A.title, A.writer, 
            date_format(A.wdate, '%Y-%m-%d') wdate,
            , A.filename, A.filelink
            (select username from tb_member B where A.writer=B.userid) username
            from tb_board A
            where id=${id}`;
            /*
            subquery:select(결과셋이 하나 또는 0일 대 가능), 
            from: 인라인뷰
            where 절에서는 드물다(책은 여기만)
            속도(빠른순) :: 조인 -> 서브쿼리 -> 함수
            nested loop join -> for문 돌려서 조인을 한다. 10이전 버전
            hash join => 양쪽 테이블의 join칼럼을 기준으로 해쉬테이블을 만들어 조인한다 (엄청빠름)
            선형 검색(n번비교), 이진검색(데이터가 순서대로 있을 때), 해쉬검색(젤빠름)
            */
      let results = await commonDB.mysqlRead(sql,[]);
      if(results.length==0)
      {
        res.json({result:"fail", msg:"해당하는 데이터를 찾을 수 없습니다."});   //id에 없는 숫자를 url에 넣으면 출력
        return;
      }
      res.json( {result:"success", msg:"데이터 전송 성공", boardData:results[0]});
});

//http://localhost:9090/rest_board/save
//{title:"제목", writer:"test", contents:"내용"}
//응답 성공 시, result:"success", msg: "등록성공"
//응답 실패 시, result:"fail", msg: "등록실패"

// upload.single("file") : 파일업로드 부분만 중간에 따로 처리한다
// upload.single(폼태그에서 file 속성의 name이 file이다)
// <input type="file" name="file"/> 이때 name 속성값이다
// 파일 전송시 form 태그에 enctype="form-data/multipart" 속성이 반드시 있어야 한다
// ejs나 jsp같은데서 사용

// ajax로 전송할때는 FormData라는 객체를 이용해서 보내야 한다 *******
// $.ajax나 axios 모던스크립트 fetch라는 ajax모듈 추가되었음

//http://127.0.0.1:9090/uploads/board/1681696047909.png
router.post("/save", upload.single("file"), async function (req, res, next) {
  checkInfos = [
    { key: "title", type: "str", range: 40 },
    { key: "writer", type: "str", range: 40 },
    { key: "contents", type: "str", range: -1 },
  ];

  let file = req.file; // body로 안온다.
  console.log(file.originalname); // 원래 이름
  console.log(file.filename); // 부여한 이름

  //수행결과 값이 0이면 문제 없는 것이고 다른 숫자가 온다. (오류임)
  insertInfo = commonUtil.checkInfo(req, checkInfos);
  if (insertInfo["result"] != 0) {
    res.json({ insertInfo });
    return;
  }

  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;
  let filename = file.filename;
  let filelink = "uploads/board/" + filename;

  let sql = `select count(*) cnt from tb_member where userid='${writer}'`;
  results = await commonDB.mysqlRead(sql, []);
  if (results[0]["cnt"] == 0) {
    res.json({ result: "fail", msg: "해당하는 아이디가 없습니다" });
    return;
  }

  sql = `
  insert into tb_board (title, writer, contents, wdate, filename, filelink)
  values('${title}', '${writer}', '${contents}', NOW(), '${filename}', '${filelink}')`;

  await commonDB.mysqlRead(sql, []);

  res.json({ result: "success", msg: "등록성공" });
});

// router.post('/save', async function(req, res, next){
//   let title = req.body.title; 
//   let writer = req.body.writer; 
//   let contents = req.body.contents; 
//   let sql = `
//             insert into tb_board (title, writer, contents, wdate)
//             values(?, ?, ?, NOW() )`;
//   try{
//     if (title === undefined)
//       return res.json({ result: "fail", msg: "title을 채워주세요" });
//     if (writer === undefined)
//       return res.json({ result: "fail", msg: "writer을 채워주세요" });
//     if (contents === undefined)
//       return res.json({ result: "fail", msg: "contents을 채워주세요" });
//     await commonDB.mysqlRead(sql,[title, writer, contents]);
//     res.json({"result":"success", msg:"등록성공"});
//   }
//   catch(e)
//   {
//     console.log(e);
//     res.json({"result":"fail", msg:"등록실패"});
//   }
// });


// 키값 마다 오류체크를 해줘야할까? 그렇다면 이렇게 체크해볼수도..
// 등록하기
router.post('/write', async function(req, res, next){
  checkInfos = [
    {key:"title", type : "str", range : 40},
    {key:"writer", type : "str", range : 40},
    {key:"contents", type : "str", range : -1}    
  ]
  //수행결과 값이 0이면 문제 없는 것이고 다른 숫자가 온다. (오류임)
  insertInfo = commonUtil.checkInfo(req,checkInfos);
  if(insertInfo["result"]!=0){
    res.json({insertInfo});
    return;
  }

  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;

  let sql = `select count(*) cnt from tb_member where userid='${writer}'`;
  results = await commonDB.mysqlRead( sql, [] );
  if(results[0]["cnt"]==0)
  {
    res.json({result:"fail", msg:"해당하는 아이디가 없습니다"});  //해당 아이디가 존재해야 writer에 등재되며 게시물 작성 가능
    return; //return을 해줘야 아래 json에 걸리지 않고 종료.
  }

  sql=`insert into tb_board (title, writer, contents, wdate)
        values( '${title}', '${writer}', '${contents}', NOW() )`;
  await commonDB.mysqlRead( sql, [] );

  res.json({"result" : "success", msg:"등록성공"})
})
// commonUtil에 가서 함수 만들자  :: checkInfo(); 작성함.
// post는 POSTMAN에서 test해보세요

module.exports = router;
