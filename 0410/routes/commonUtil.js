//routes 폴더에 놓을 것 commonUtil.js

function getPaging(pg, totalCnt, pageGroupSize=10)
{
    /* 
    1 2 3 4 5 6 7 8 9 10                0~9      >> group 1  1~10page
    11 12 13 14 15 16 17 18 19 20       10~19     >> group 2  11~20page
    21 22 23 24 25 26 27                20~26     >> group 3  21~30page

    (1-1)/10*10  = 0  
    (2-1)/10*10  = 0
    .
    .
    (9-1)/10*10  = 0
    (10-1)/10*10  = 0
    (11-1)/10*10  = 10
    (12-1)/10*10  = 10
    (13-1)/10*10  = 10
    .
    .
    (21-1)/10*10  = 20
    */

   // 전체 페이지 갯수를 확인해보고, 어느 그룹에 속하는지 확인해야 한다.
   pnTotal = Math.ceil(totalCnt/10);  // 전체 페이지 갯수
   // 강제올림.. 글이 5개 남아도 한 페이지 차지해야 함.

    pgGroupStart = parseInt((pg - 1) / pageGroupSize) * pageGroupSize + 1; //소숫점 자르기 위해 parseInt사용
    pgGroupEnd = pgGroupStart+10;
    if(pgGroupEnd >= pnTotal)
        pgGroupEnd = pnTotal +1;
    console.log(pg, pgGroupStart, pgGroupEnd);

    //함수는 반환값이 하나이어야 한다. JSON객체로 만들어 보내면 여러개를 동시에 보낼 수 있음.. 객체로 만들어서 보내자!
    return {pnTotal:pnTotal, pnStart:pgGroupStart, pnEnd:pgGroupEnd, pg:pg}
}

// for(i=1; i<=32; i++)
//     getPaging(i, 320); 
// 어떻게 찍히나 확인용

exports.getPaging = getPaging;  //모듈 내보내기