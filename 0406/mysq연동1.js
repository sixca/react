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
        select id, title, writer, date_format(wdate, '%Y-%m-%d') wdate 
        from tb_board
    `;
    //sql = "select * from tb_board";
    connection.query(sql, (err, rows)=>{
        console.log(rows);
        connection.release(); // 연결해제
    })
});
console.log("end");