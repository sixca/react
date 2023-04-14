import React, {useState} from 'react';

function Gugudan2(props){
    const [dan, setDan]=useState(1);
    const [iList] = useState([1,2,3,4,5,6,7,8,9]);
    const [show, setShow]=useState(false); //show가 true일때만 화면에 구구단 출력

    const danChange= (e) =>{
        setShow(false); //show를 false로 해서 화면에 출력을 막음
        setDan(e.target.value); //단값 넣고
    }
    const goConfirm = () =>{
        setShow(true);
    }

    return (
        <div>
             몇 단요? <input type="text" onChange={danChange}/>
            <button type="button" onClick={goConfirm}>구구단 출력</button>
            <br/><br/>
            <ul>
                {  
                    show?
                    iList.map((item, index)=>{
                        return(
                            <li key={index}>
                            <p>  {dan} X {item} = {dan*item}  </p>
                            </li>
                        );
                    })
                    :""
                }
            </ul>    

        </div>


    )

}

export default Gugudan2;