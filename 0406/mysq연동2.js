var mysql = require("mysql"); //npm install mysql
var pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'user01',
    //password:'1234',
    database:'mydb',
    port:3306
});

//DB와 연결한다
pool.getConnection( (err, connection)=>{
    //DB와 연결을 성공하면 매개변수로전달된 함수가 호출된다.
    //err - DB와 연결 실패 시 처리
    if(err)
    {
        console.log(err);
        return;
    }

    //연결 성공 시 연결객체 connection을 전달한다
    //연결 객체
    console.log("connection success");
    sql = `
        insert into tb_board(title, writer, contents, wdate)
        values(?,?,?,now())
    `;   // ?,?,? 해두고 params 선언해서 담아주주고, connection할 때 데이터 연동하면 됨
    let params = ['제목4', '황비홍', '내용4'];

    connection.query(sql, params, (err, rows)=>{
        if(err)
            console.log("err");
        else      
            console.log("insert 성공");

        sql = "select * from tb_board";             //전체조회
        connection.query(sql, params, (err, rows)=>{
            if(err)
                console.log("err");
                    
            console.log(rows);
        });    
    });
    
    // sql = "select * from tb_board";
    // connection.query(sql, params, (err, rows)=>{
    //     if(err)
    //         console.log("err");
              
    //     console.log(rows);
    // });  //이 위치에서 구현 시, 비동기 방식이므로 출력 순서가 뒤죽박죽
            //selectAll이 먼저 실행되면, insert된 데이터가 출력이 안 될 수도.. [!주의사항!]

});
console.log("end");