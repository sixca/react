//map으로 새 배열 생성 (for문 사용 불가)
//클릭 시 alert창

import React, {useState} from 'react';

function Fortest1(props){
    const [fruitList] = useState(['사과', '배', '포도', '수박', '메론']);
    const goSelect = (index)=>{
        alert(fruitList[index]);
    }

    return (
        <div>
          <ul>
            {  // map((객체, 객체의 인덱스)=>{})
                fruitList.map((item, index)=>{
                    return(
                        <li key={index}>
                            <a href="#none" onClick={()=>{goSelect(index)}}>  {item}  </a>
    {/* 앵커태그 #none의 장점은 링크태그를 눌러도 맨 위로 안 올라감. 
    웹페이지에 데이터를 입력하다가 뭔가를 쓰려고 하면 화면이 맨 위로 올라가는 경우가 있음..(링크태그의 특징임.) */}
    {/* onClick={()=>{goSelect(index)}
        함수를 호출 시, 태그는 함수 주소를 저렇게 매개변수로 전달해줘야함  */}
                        </li>
                        )
                })
            }
            </ul>
        </div>
    )
}

export default Fortest1;

