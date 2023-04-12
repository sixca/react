//react는 if문 불가

import React, {useState} from "react";

function Iftest1(props){
    const [flag, setFlag]=useState(true);
    const changeFlag = () => {
        setFlag( !flag );    //flag=true면 false, false면 ture >> 버튼 누를 시 마다 T, F, T, F 바꾸어주는 방법
    }

    return(
    <div>
        <h1>if테스트 {flag}</h1>
        <button type="button" onClick={changeFlag}>토글</button>
        <p>{flag?'이 문구가 보입니다.':''}</p>
    </div>
    )
}

export default Iftest1;