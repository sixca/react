import 'bootstrap/dist/css/bootstrap.min.css'; //부트스트랩 라이브러리

import {Outlet, Link, NavLink} from "react-router-dom";

//jsx문법에서는 class = className이라고 써야함
function Layout(){
    return(
        // NavLink, to를 쓰자 :: a, href 쓰는 앵커태그는 page 전체를 바꿔서 잘 쓰지 않는다.                         
        <div>
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/board/list">게시판</NavLink>
                        </li>  
                        <li className="nav-item">
                            <a className="nav-link" href="#">대기중</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">대기중</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div style={{marginTop:"20px"}}/>
            <Outlet />             
            {/* 컴포넌트가 출력되는 위치 */}
        </div>
    )
}

export default Layout;