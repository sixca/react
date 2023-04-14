import React, { useState, useEffect } from 'react';  // 함수기반 컴포넌트를 쓰려면 필수
import axios from "axios";  // 데이터통신하려고 axios 라이브러리 
import { SERVERIP } from "../../CommonUtil";  // CommonUil.js에서 지정한 포트 땡겨오기 >> http://127.0.0.1:9090
import {Link, useNavigate, useParams} from "react-router-dom";   //useNavigate는 화면이동. 레이아웃은 유지한 채로


function BoardWrite(props){
    
    let {id} = useParams(); //보내는 쪽에서 json객체로 보내니 json객체로 id를 받아옴
    let history = useNavigate();

    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    const [contents, setContents] = useState("");

    useEffect(()=>{
        console.log("id", id);
        // BoardWrite 컴포넌트가 /board/write 일 때는 undefined가 오고
        // /board/view/1 id에는 파라미터 값이 저장된다.
        async function loadData(id){
            let results = await axios.get(SERVERIP+"/rest_board/view/"+id)

            setTitle(results.data.rest_board.title);
            setWriter(results.data.rest_board.writer);
            setContents(results.data.rest_board.contents);
        }
        if( id != undefined ) //write가 아니고 view를 호출할 때    
            loadData(id);
    });

    const titleChange=(e)=>{
        setTitle(e.target.value);
    };

    const writerChange=(e)=>{
        setWriter(e.target.value);
    };

    const contentsChange=(e)=>{
        setContents(e.target.value);
    };

    //서버로 전송하기
    const postData=()=>{
        //데이터를 json으로 묶어서 보내야 한다
        let data = {"title":title, "writer":writer, "contents":contents};
        axios.post(SERVERIP+"/rest_board/write", data)
        .then( (res)=>{
            console.log( res.data );
            history("/board/list"); // redirect와 유사하지만 틀은 유지되야 하니 useNavigate를 이용하시오
        })
        .catch((error)=>{
            console.log( error );
        });
    }
    return(
        <div className="container">
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
                        value={title}
                        placeholder="제목을 입력하세요" onChange={titleChange}></input>
                    </div>
                </td>
              </tr>       
              <tr>
                <td>작성자</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control"
                        value={writer}
                        placeholder="작성자를 입력하세요" onChange={writerChange} ></input>
                    </div>
                </td>
              </tr>        
              <tr>
                <td>내용</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control"
                        value={contents}
                        placeholder="내용을 입력하세요" onChange={contentsChange} ></input>
                    </div>
                </td>
              </tr>                
            </tbody>
          </table>
       
          <div className="container mt-3" style={{textAlign:"right"}}>
            <Link className="btn btn-secondary" onClick={postData}>등록</Link>&nbsp;&nbsp;
            <Link className="btn btn-secondary">취소</Link>
          </div>

        </div>
    )

}

export default BoardWrite;