import React, { useState, useEffect } from 'react';  // 함수기반 컴포넌트를 쓰려면 필수
import axios from "axios";  // 데이터통신하려고 axios 라이브러리 
import { SERVERIP } from "../../CommonUtil";  // CommonUil.js에서 지정한 포트 땡겨오기 >> http://127.0.0.1:9090
import {Link, useNavigate, useParams} from "react-router-dom";   //useNavigate는 화면이동. 레이아웃은 유지한 채로


function BoardWrite(props){
    
    let {id} = useParams(); //보내는 쪽에서 json객체로 보내니 json객체로 id를 받아옴
    let history = useNavigate();

    // const [title, setTitle] = useState("");
    // const [writer, setWriter] = useState("");
    // const [contents, setContents] = useState("");

    //변수4개를 하나의 JSON객체로 저장 :: 필드가 많을 때 변수하나씩 만들면 힘들다
    const[inputs, setInputs]=useState({
        title:'', writer:'', contents:'', filename:''
    });

    // useEffect(()=>{
    //     console.log("id", id);

    //     async function loadData(id){
    //         let results = await axios.get(SERVERIP+"/rest_board/view/"+id)
    //         console.log(results.data.boardData.title);

    //         setTitle(results.data.boardData.title);
    //         setWriter(results.data.boardData.writer);
    //         setContents(results.data.boardData.contents);
    //     }
    //     if( id != undefined ) //write가 아니고 view를 호출할 때    
    //         loadData(id);
    // }, [id]);

    const onChange =(e)=>{
        const {value, name} = e.target; //입력객체로부터 값과 이름을 가져온다
        console.log(value, name)
        setInputs({...inputs, [name]:value })   //{...inputs} :: json 객체 복사
    }
    // let temp=inputs;
    // temp[name] = value;
    // setInputs(temp);     
    // 위 3줄을  setInputs({...inputs, [name]:value }) 이렇게 1줄로 표현한 것임.



    // const titleChange=(e)=>{
    //     setTitle(e.target.value);
    // };

    // const writerChange=(e)=>{
    //     setWriter(e.target.value);
    // };

    // const contentsChange=(e)=>{
    //     setContents(e.target.value);
    // };

    //서버로 전송하기
    // const postData=()=>{
    //     //데이터를 json으로 묶어서 보내야 한다
    //     let data = {"title":title, "writer":writer, "contents":contents};
    //     axios.post(SERVERIP+"/rest_board/write", data)
    //     .then( (res)=>{
    //         console.log( res.data );
    //         history("/board/list"); // redirect와 유사하지만 틀은 유지되야 하니 useNavigate를 이용하시오
    //     })
    //     .catch((error)=>{
    //         console.log( error );
    //     });
    // }
    const postData=()=>{
        //데이터를 json으로 묶어서 보내야 한다
        let frmData = new FormData(); // 파일을 전송할 때 반드시 이 객체로 보내야 한다
        frmData.append("title", inputs.title);
        frmData.append("writer", inputs.writer);
        frmData.append("contents", inputs.contents);
        frmData.append("file", window.document.myform.file.files[0]);  //파일은 객체로 접근이 안 되고, 반드시 이렇게 접근을 해야 함.
        //파일 첨부시 자바스크립트가 파일이 여러 개 첨부하는 것으로 처리한다. 
        //그래서 무조건 배열의 형태이다. document.폼이름.file태그의 name속성.files[0];
        //여러개 추가할 수도 있다.
        axios.post(SERVERIP+"/rest_board/save", frmData)
        .then( (res)=>{
            console.log( res.data );
            history("/board/list"); // redirect와 유사하지만 틀은 유지되야 하니 useNavigate를 이용하시오
        })
        .catch((error)=>{
            console.log( error );
        });
    }

    //json을 각개 변수로 해체(destruction)
    const{title, writer, contents, file} = inputs;
    return(
        <div className="container">
            <form name="myform" encType='multipart/form-data'>
                <h1>게시판</h1>

                <table className="table table-hover " style={{marginTop: "30px"}}>
                <colgroup>
                    <col width="25%"/>
                    <col width="*"/>
                </colgroup>
            
                <tbody>
                <tr>
                    <td>제목</td>
                    <td>
                        <div className="mb-3" style={{marginTop:"13px"}}>
                            <input type="text" className="form-control" 
                            value={title} name="title"
                            onChange={onChange} //추가
                            placeholder="제목을 입력하세요" ></input>
                        </div>
                    </td>
                </tr>       
                <tr>
                    <td>작성자</td>
                    <td>
                        <div className="mb-3" style={{marginTop:"13px"}}>
                            <input type="text" className="form-control"
                            value={writer} name="writer"
                            onChange={onChange} //추가
                            placeholder="작성자를 입력하세요"></input>
                        </div>
                    </td>
                </tr>        
                <tr>
                    <td>내용</td>
                    <td>
                        <div className="mb-3" style={{marginTop:"13px"}}>
                            <input type="text" className="form-control"
                            value={contents} name="contents"
                            onChange={onChange} //추가
                            placeholder="내용을 입력하세요"></input>
                        </div>
                    </td>
                </tr>     
                <tr>
                    <td>파일</td>
                    <td>
                        <div className="mb-3" style={{marginTop:"13px"}}>
                            <input type="file" className="form-control"
                            value={file} name="file"
                            onChange={onChange} //추가
                            placeholder="파일을 입력하세요"></input>
                        </div>
                    </td>
                </tr>               
                </tbody>
            </table>
        
            <div className="container mt-3" style={{textAlign:"right"}}>
                <Link className="btn btn-secondary" onClick={postData}>등록</Link>&nbsp;&nbsp;
                <Link className="btn btn-secondary">취소</Link>
            </div>
            
         </form>
        </div>
    )

}

export default BoardWrite;