import React, { useState, useEffect } from 'react';  // 함수기반 컴포넌트를 쓰려면 필수
import axios from "axios";  // 데이터통신하려고 axios 라이브러리 
import { SERVERIP } from "../../CommonUtil";  // CommonUil.js에서 지정한 포트 땡겨오기 >> http://127.0.0.1:9090
import {Link, useNavigate, useParams} from "react-router-dom";   //useNavigate는 화면이동. 레이아웃은 유지한 채로


function ScoreWrite(props){
    
    let {id} = useParams(); //보내는 쪽에서 json객체로 보내니 json객체로 id를 받아옴
    let history = useNavigate();

    const [userName, setUserName] = useState("");
    const [kor, setKor] = useState(0);
    const [eng, setEng] = useState(0);
    const [mat, setMat] = useState(0);


    useEffect(()=>{
        console.log("id", id);
        // ScoreWrite 컴포넌트가 /board/write 일 때는 undefined가 오고
        // /board/view/1 id에는 파라미터 값이 저장된다.
        async function loadData(id){
            let results = await axios.get(SERVERIP+"/score/view/"+id)
            console.log(results.data.score.user_name);
            console.log(results.data.score.kor);
            console.log(results.data.score.eng);
            console.log(results.data.score.mat);

            setUserName(results.data.score.user_name);
            setKor(results.data.score.kor);
            setEng(results.data.score.Eng);
            setMat(results.data.score.Mat);
        }
        if( id != undefined ) 
        // write가 아니고 view를 호출할 때    
            loadData(id);
    });

    const nameChange=(e)=>{
        setUserName(e.target.value);
    }

    const scoreChange=(e)=>{
        setKor(e.target.value);
        setEng(e.target.value);
        setMat(e.target.value);
    }

    //서버로 전송하기
    const postData=()=>{
        let data = {"user_name":userName, "kor":kor, "eng":eng, "mat":mat};
        axios.post(SERVERIP+"/score/write", data)
        .then( (res)=>{
            console.log( res.data );
            history("/score/list"); // redirect와 유사하지만 틀은 유지되야 하니 useNavigate를 이용하시오
        })
        .catch((error)=>{
            console.log( error );
        });
    }
    return(

    )

}

export default ScoreWrite;