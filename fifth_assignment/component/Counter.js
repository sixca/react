import React, {useState} from "react";

function Counter(props){
    const [name, setName]=useState("");
    const [kor, setKor]=useState(0);
    const [eng, setEng]=useState(0);
    const [mat, setMat]=useState(0);

    const [total, setTotal] = useState("");
    const [avg, setAvg] = useState("");

    const nameChange=(e)=>{
        //인자 e는 발생한 이벤트에 대한 모든 정보를 갖고 있음
        //console.log( e.target.value ); //e가 발생시킨 이벤트(target)를 통한 value를 찍음
        setName(e.target.value); //name변수의 값이 바뀐다
    }
    const korChange=(e)=>{
        setKor(parseInt(e.target.value)); 
    }
    const engChange=(e)=>{
        setEng(parseInt(e.target.value)); 
    }
    const matChange=(e)=>{
        setMat(parseInt(e.target.value)); 
    }
    const result=(e)=>{
        setTotal(kor + eng + mat);
        setAvg(Math.round((kor + eng + mat)/3));
    }
 

    let mystyle={
        color:"white",
        backgroundColor:"orange",
        fontSize:"10pt",
        padding:"10px 5px 10px 5px"
    }

    return(
        <div>
            <h2 style={mystyle}>프리미엄 성적 계산기</h2>
            이름 : <input type ="text" onChange={nameChange}/><br/>         
            국어 : <input type ="text" onChange={korChange}/><br/>
            영어 : <input type ="text" onChange={engChange}/><br/>
            수학 : <input type ="text" onChange={matChange}/><br/><br/>
            <button type="button" onClick={result}
                style={{ backgroundColor: '#007bff', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', marginRight: '1rem' }}>
                결과 확인</button>
            <p>{name}님의 과목별 점수 : 국어 {kor}점, 영어 {eng}점, 수학 {mat}점</p>
            <p>{name}님의 총점은{total}점이고, 평균은 {avg}점입니다</p>
        </div>
    )
}
export default Counter;
