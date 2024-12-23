import axios from "axios";
import { useEffect, useState } from "react";

const PocketmonInfinite = (props) =>{
    const[page, setPage] = useState(1);
    const[size, setSize] = useState(30);
    const[pocketmonList, setPocketmonList] = useState([]);
    

    const loadPocketmon = ()=>{
        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/pocketmon/page/${page}/size/${size}`,
            method:"get"
        })
        .then(response=>{
            //setPocketmonList(response.data);//덮어쓰기
            setPocketmonList([...pocketmonList,...response.data]);//spread 연산자
            // setPocketmonList(pocketmonList.concat(...response.data));//concat함수
        }).catch();
    };

    useEffect(()=>{
        loadPocketmon();
    },[page]);

    //다음 페이지
    const nextPage = ()=>{
        setPage(page+1);//페이지 1 증가
    }

    //개수가 변하면  페이지를 1로, 목록을 모두 지우고 다시 불러오기
    useEffect(()=>{
        setPage(1);
        setPocketmonList([]);
        loadPocketmon();
    },[size]);
    return(
        <>
           <div className="row">
                <div className="col">
                    <h1>무한 스크롤</h1>
                </div>
           </div>

            <div className="row mt-4">
                <div className="col-2 offset-10">
                    <select value={size} onChange={e=>setSize(e.target.value)}>
                        <option value="20">20개씩 보기</option>   
                        <option value="30">30개씩 보기</option>   
                        <option value="50">50개씩 보기</option>  
                        <option value="100">100개씩 보기</option>  
                    </select>
                </div>
            </div>

           <div className="row mt-4">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>속성</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pocketmonList.map(pocketmon=>(
                                <tr key={pocketmon.no}>
                                    <td>{pocketmon.no}</td>
                                    <td>{pocketmon.name}</td>
                                    <td>{pocketmon.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
           </div>
            {/* 더보기 버튼 */}
            <div className="row mt-2">
                <div className="col">
                    <button className="btn btn-primary w-100" onClick={nextPage}>
                        {size}개 더 보기
                    </button>
                </div>
            </div>
            


        </>
    );
};


export default PocketmonInfinite;