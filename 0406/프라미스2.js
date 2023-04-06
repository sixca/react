// mysq연동2.js에서 테이블 insert 하는 동작을
// 프라미스 구문으로 진행해보자
// 프라미스를 통해 필히 수행되어야 하는 동작을 필히 수행한다. then

//mysql 모듈을 사용하여 DB와의 연결을 수행하고, connection 변수를 선언 
var mysql = require("mysql"); //npm install mysql
var pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'user01',
    //password:'1234',
    database:'mydb',
    port:3306
});

pool.getConnection( (err, connection)=>{
    //DB와 연결을 성공하면 매개변수로전달된 함수가 호출된다.
    //err - DB와 연결 실패 시 처리
    if(err)
    {
        console.log(err);
        return;
    }
    //연결 성공시 연결객체 connection을 전달한다 
    //연결 객체
    console.log("connection success");

    new Promise((resolve, reject)=>{
        sql = `
        insert into tb_board(title, writer, contents, wdate)
        values(?,?,?,now())
    `;
    let params = ['제목4', '황비홍', '내용4'];
        connection.query(sql, params, (err, rows)=>{
            if(err)
                reject("DB 오류");
            else      
                resolve("success"); //then구문으로 이동한다
    });
})
    .then( (result)=>{
        sql = "select * from tb_board";  
        connection.query(sql, (err, rows)=>{
            if(err)
                console.log("err");
                    
            console.log(rows);
        });   
    })
    .catch( (error)=>{
        console.log(error);
    });
});
console.log("end");

//비동기 방식에서는 return; 쓰면 안 됨.