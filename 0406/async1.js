function sigma1(limit)
{
    sum=0;
    for(i=1; i<=limit; i++)
        sum+=i;
        return sum;
}
console.log( sigma1(100) );  //sigma는 수열의 합을 계산

//async :: 해당 함수는 항상 프라미스를 반환함.
async function sigma2(limit=10)
{
    sum=0;
    for(i=1; i<=limit; i++)
        sum+=i;
        return sum; //async에 의해서 무조건 Promise객체로 바뀌어서 전달된다.
}
//console.log( sigma2(100) );  //sigma는 수열의 합을 계산
sigma2(100)
.then( (result)=>{
    console.log(result);
});

async function showDispaly()
{
    /*
    sigma(100)
    .then( (result)=>{
        console.log( result );
    });
    */
   let result = await sigma1(1000); //기다린다. 반환값이 프라미스 객체가 아니다.
   console.log( result ); 
}

showDispaly();
// async/await 구문을 사용하면, Promise 객체를 다루는데 필요한 then 메소드나 catch 메소드를 사용하지 않고도, 비동기 처리의 결과를 간편하게 처리
