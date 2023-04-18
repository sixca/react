import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';  // 함수기반 컴포넌트를 쓰려면 필수
import axios from "axios";  // 데이터통신하려고 axios 라이브러리 
import { SERVERIP } from "../../CommonUtil";  // CommonUil.js에서 지정한 포트 땡겨오기 >> http://127.0.0.1:9090


function BoardList(porps){
    const [BoardList, setBoardList] = useState([]);
    const [Loading, setLoading] = useState(false);

    useEffect( ()=>{
        async function loadData(){    //console창에서 오류 잡아준대로 바꿔서 오류 잡음
            const url = SERVERIP+"/hero/list";
            await axios.get(url)
            .then((res)=>{
                setBoardList(res.data);
                setLoading(true);
                console.log(res.data); // 영웅리스트가 맞나 콘솔에 찍어보고
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    loadData();
    }, []);

    return(
        <div className="container">
            <h1>세기의 영웅 리스트</h1>
            <div className="input-group mb-3" style={{marginTop:"20px"}}>
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                선택하세요
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">제목</a></li>
              <li><a className="dropdown-item" href="#">내용</a></li>
              <li><a className="dropdown-item" href="#">제목+내용</a></li>
            </ul>
            <input type="text" className="form-control" placeholder="Search"></input>
            <button className="btn btn-secondary" type="submit">Go</button>
          </div>

        <table className="table table-hover ">
            <thead className="table-secondary">
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
                {
                    Loading===true?
                    BoardList.map( (item, index)=>{
                        return(
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td><Link to={"/board/view/"+item.id}>{item.hero_name}</Link></td>
                                <td>{item.hero_desc}</td>
                            </tr>
                        )
                    })
                    :null
                }           
            </tbody>
          </table>
          {/* 버튼만들기 */}
          <div>
              <Link className="btn btn-danger" to="/board/write">글쓰기</Link>
          </div> 
        </div>
    )
}

export default BoardList;