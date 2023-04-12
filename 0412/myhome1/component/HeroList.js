//HeroList.js - 백앤드서버로부터 데이터 가져온다
//axios - 설치 필요
import React, {useState, useEffect} from "react"; 
import axios from 'axios';

function HeroList(props){
    const[heroList, setHeroList]=useState([]);
    const[loading, setLoading]=useState(false); //데이터를 수신하면 true로 바뀐다

    //useState함수가 값을 초기화를 해주면 해당 값을 저장할 변수와 해당 값을 변경하는 함수를 반환한다
    //배열을 저장하는 heroList 변수 반환, 배열 값을 변환할 함수 주소 setHeroList

    //첫번째 매개변수 - mount 될 때, update 될 때, unmount 될 때 호출된다
    //[]-변수: 변수들이 바뀔 때 호출된다.
    useEffect(()=>{
        // console.log("나 호출된다");
        // setHeroList(heroList.concat([
        //     {id:1, name:"이순신", descr: "임란승리"},
        //     {id:2, name:"권현진", descr: "백수왕"},
        //     {id:3, name:"김좌진", descr: "독립투사"}
        // ])) 직접입력했던 DB

        axios.get("http://localhost:9090/hero/list")
        .then(
            (res)=>{
                console.log("******");
                console.log(res);
                setHeroList(res.data); // DB에서 데이터 응답받음
                setLoading(true);  // 로딩이 완료되면 true로 바뀌게하여 오류방지
            }
        )
        .catch((res,status,error)=>{
            console.log(status);
        })

    },[]);

    return (
        <div>
        <table>
            <tbody>
            {
                loading===true?
                    heroList.map((item,index)=>{
                        return(
                                //<tbody key={(item.id)}> 
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.hero_name}</td>
                                    <td>{item.hero_desc}</td>
                                </tr>
                         //   </tbody> 
                        );
                    })
                :""    //삼항연산자로 오류 방지..
            }
            </tbody>
        </table>
        </div>
    )
}
export default HeroList;