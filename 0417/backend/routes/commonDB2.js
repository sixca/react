// board.js에서 DB접근, member.js DB접근 -- DB에 데이터 읽고 쓰기 전문 코드
// DB주소가 바뀐다면?, 해킹된다면?,ip를 코드에 박아버리면? 
// txt에 ip를 넣어두고 읽고 쓰게 해야지

// commonDB_clone.js에서 상세히 다루어 놓았읍니다..

var mysql = require("mysql");
const score = {
    connectionLimit:10,
    host:"localhost",
    user:"USER01",
    password:"1234",
    database: "score",
    port:3306
};   //새로운 스키마(score)를 만들고 진행해서 commonDB2를 만듬.

let readpool = mysql.createPool(score); 
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
exports.score = score;



