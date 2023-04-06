// 데이터베이스에 연결하고 쿼리를 실행하는 데 사용되는 함수를 정의하여 데이터베이스와 상호 작용

var mysql = require("mysql"); //mysql 모듈 사용
const DBInfo = {  // DB 연결에 필요한 정보 저장
    connectionLimit:10,
    host:"localhost",
    user:"user01",
    database: "mydb",
    port:3306
};

let readpool = mysql.createPool(DBInfo); //DB 풀 생성
async function mysqlRead(sql, params) //SQL 쿼리문과 해당 쿼리문에 사용될 매개변수 배열 params를 받음
{
    let promise = new Promise((resolve, reject)=>{
        readpool.getConnection( (err, conn)=>{ //DB풀과 연결. conn은 연결 객체로 이름 지어줌
            if(err)
            {
                console.log(err);
                reject(err);
            } 

            conn.query(sql, params, (err, rows)=>{ //conn.query 메서드를 사용하여 SQL쿼리문을 실행하고 결과를 반환
                console.log(sql);
                console.log(rows);
                if(err)
                    reject(err); //에러 시 reject 메서드로 프로미스를 거부
                else
                    resolve(rows); // rows가 있을 시 resolve 메서드가 프로미스를 이행함
                conn.release(); //release 메서드가 연결을 풀에 반환. 즉, 종료가 아니라 연결을 사용한 후 해당 연결을 필요할 때마다 가져와 사용하는 것. 다른 요청이 일어나면 또 재사용함.(성능향상) 마무리 메서드이긴 하지..
            })

        })
    })
    await promise;   // mysqlRead 함수가 실행될 때, 내부적으로 반환되는 프로미스 객체가 완료될 때 까지 기다리라는 뜻. promise 객체가 완료되면, 결과를 반환. 약속된 동작을 필히 수행하기 위함. 처리완료까지 다음 코드 실행말고 기다리도록 함.
    return promise; // mysqlRead 함수가 프로미스 객체를 반환하는 것. 이 프로미스 객체를 가지고 비동기 처리를 계속할 수 있게 됨.
}
exports.mysqlRead = mysqlRead; // mysqlRead 함수를 모듈 외부에서도 사용할 수 있도록 내보내는 역할. 이를 통해 다른 모듈에서 이 함수를 사용할 수 있게 됨.
// 그래서 이 함수를 사용하기 위해 board.js에서 let commonDB = require("./commonDB");를 선언함.