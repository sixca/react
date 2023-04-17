import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';  // 함수기반 컴포넌트를 쓰려면 필수
import axios from "axios";  // 데이터통신하려고 axios 라이브러리 
import { SERVERIP } from "../../CommonUtil";  // CommonUil.js에서 지정한 포트 땡겨오기 >> http://127.0.0.1:9090
import Pagination from 'react-js-pagination';  //페이지 기능 넣기 위함.  npm install react-js-pagination
import "../../page.css";

function BoardList(porps){
    const [BoardList, setBoardList] = useState([]);
    const [totalCnt, setTotalCnt] = useState(0);
    const [pg, setPg] = useState(0);
    const [Loading, setLoading] = useState(false);

    const loadData = async (pg) =>{
        const url = SERVERIP+"/rest_board/list/"+pg;
        await axios.get(url)
        .then( (res)=>{
            let totalCnt = res.data.totalCnt;
            let pg = res.data.pg;
            let boardList = res.data.boardList;
            console.log("데이터 전체 개수 : ", totalCnt );
            console.log("현재 페이지 : ", pg );
            console.log("데이터 : ", boardList );

            setTotalCnt(totalCnt);
            setPg(pg);
            setBoardList(boardList);
            
            setLoading(true);
            console.log(res.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    const goPage = (pg) => {
        setPg(pg);
        loadData(pg);
      };  // page 넘기기 메서드

    useEffect( ()=>{ 
    loadData(1);
    }, []);    // 

    return(
        <div className="container">
            <h1>게시판</h1>
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
            <colgroup>
                <col width="8%"/>
                <col width="*%"/>
                <col width="14%"/>
                <col width="14%"/>
            </colgroup>

            <thead className="table-secondary">
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>file</th>
              </tr>
            </thead>
            <tbody>
                {
                    Loading===true?
                    BoardList.map( (item, index)=>{
                        return(
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td><Link to={"/board/view/"+item.id}>{item.title}</Link></td>
                                <td>{item.username}</td>
                                <td>{item.wdate}</td>
                                <td>
                                    {
                                        item.filelink!=null?
                                        <img src={`http://127.0.0.1:9090/${item.filelink}`}
                                             height="100px" crossOrigin='anonymous'></img>  //crossOrigin은 웹 페이지에서 다른 도메인의 이미지를 가져올 때 발생할 수 있는 보안 문제를 해결하는 데 사용되는 HTML 속성
                                        :""                                                 //anonymous는 인증 없이 리소스를 요청하는 것을 의미
                                    }  
                                </td>
                            </tr>
                        )
                    })
                    :null
                }           
            </tbody>
          </table>


        <Pagination
            activePage={pg} //현재 실행중인 페이지
            itemsCountPerPage={10}
            totalItemsCount={totalCnt}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={goPage}
        />

          {/* 버튼만들기 */}
          <div>
              <Link className="btn btn-danger" to="/board/write">글쓰기</Link>
          </div> 
        </div>
    )
}

export default BoardList;