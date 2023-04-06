// board.js에서 DB접근, member.js DB접근 -- DB에 데이터 읽고 쓰기 전문 코드
// DB주소가 바뀐다면?, 해킹된다면?,ip를 코드에 박아버리면? 
// txt에 ip를 넣어두고 읽고 쓰게 해야지

var mysql = require("mysql");
const DBInfo = {
    connectionLimit:10,
    host:"localhost",
    user:"user01",
    //password:"1234",
    database: "mydb",
    port:3306
};

let readpool = mysql.createPool(DBInfo); 
async function mysqlRead(sql, params)
{
    let promise = new Promise((resolve,reject)=>{
        readpool.getConnection( (err,conn)=>{
            if(err)
            {
                console.log(err);
                reject(err);
            }

            conn.query(sql, params, (err, rows)=>{
                console.log( sql );
                console.log( rows );
                if(err)
                    reject(err);
                else
                    resolve(rows);
                conn.release();
            })
        })
    })
    await promise;
    return promise;
}

exports.mysqlRead = mysqlRead;


