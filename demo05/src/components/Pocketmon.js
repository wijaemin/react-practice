import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaRegEdit, FaPlus } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { Modal } from "bootstrap";
const Pocketmon = (props)=>{

    const [pocketmonList, setPocketmonList] = useState([]);

    const loadPocketmon = ()=>{
        //서버에서 poceketmon list를 불러와서 state에 설정하는 코드가 필요
        axios({
            url:"http://localhost:8080/pocketmon/",
            method:"get"
        })
        .then(response =>{
            // console.log(response);
            setPocketmonList(response.data);
        })
        .catch(err=>{});
    };    

    useEffect(()=>{
        loadPocketmon();
    },[]);

    //포켓몬 삭제
    //서버에 통신을 보내 삭제한 뒤 목록 갱신
    const deletePocketmon = (pocketmon)=>{
        const choice= window.confirm("정말 삭제?");
        if(choice===false) return;
        //axios({옵션}).then(성공시 실행할 함수).catch(실패시 실행할 함수);
        axios({
            url:`http://localhost:8080/pocketmon/${pocketmon.no}`,
            method:"delete"
        })
        .then(response=>{
            loadPocketmon();
        })
        .catch(err=>{});
    };

    //modal 관련된 처리
    const bsModal = useRef();

    const openModal =()=>{
        const modal = new Modal(bsModal.current);
        modal.show();
    };
    const closeModal = ()=>{
        const modal = Modal.getInstance(bsModal.current);
        clearPocketmon();
        modal.hide();
    };


    //등록과 관련된 state
    const [pocketmon, setPocketmon] = useState({
        name:"",
        type:""
    });

    const changePocketmon =(e)=>{
        setPocketmon({
            ...pocketmon,
            [e.target.name] : e.target.value
        });
    };
    const clearPocketmon = ()=>{
        setPocketmon({name:"",type:""});
    };

    //axios로 서버에 등록 요청을 보낸 뒤 등록이 성공하면 목록을 갱신하도록 처리
    const savePocketmon = ()=>{
        //입력값 검사 후 차단 코드 추가
        axios({
            url:"http://localhost:8080/pocketmon/",
            method:"post",
            data:pocketmon
        })
        .then(response=>{
            loadPocketmon();
            closeModal();
        })
        .catch(err=>{});
    };
    //포켓몬 수정

    const editPocketmon = (target)=>{
        setPocketmon({...target});
        openModal();
    };
    //포켓몬 수정 처리
    const updatePocketmon = () =>{

        const {no, name, type} =pocketmon;
        axios({
            url:`http://localhost:8080/pocketmon/${no}`,
            method:"put",
            data:{
                name:name,
                type:type
            }
        }).then(response=>{
            loadPocketmon();
            closeModal();
        }).catch(err=>{});
    };
    return(
        <>
            <div className="row">
                <div className="col">
                    <h1>포켓몬 관리</h1>
                    <p>React CRUD 연습</p>
                </div>
            </div>
            {/* 추가 버튼 */}
            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-success" onClick={openModal}>
                        <FaPlus/> 추가
                    </button>
                </div>
            </div>
            {/* 출력 위치 */}

            <div className="row mt-4">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>속성</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pocketmonList.map(pocketmon=>(
                                <tr key={pocketmon.no}>
                                    <td>{pocketmon.no}</td>
                                    <td>{pocketmon.name}</td>
                                    <td>{pocketmon.type}</td>
                                    <td>
                                        {/* 아이콘 */}
                                        <FaRegEdit className="text-warning" 
                                        onClick={e=>editPocketmon(pocketmon)}/>
                                        <TiDelete className="text-danger" 
                                        onClick={e=>deletePocketmon(pocketmon)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Modal */}
            <div className="modal fade" ref={bsModal}
                   data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header d-flex justify-content-between">
                      <h5 className="modal-title" id="exampleModalLabel">
                        {pocketmon.no === undefined  ? '신규 몬스터 등록' : `${pocketmon.no}번 몬스터 수정`}
                      </h5>
                      <button type="button" className="border-0 bg-transparent" data-bs-dismiss="modal" aria-label="Close" 
                                onClick={closeModal}>
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">

                    <div className="row">
                        <div className="col">
                            <label className="form-label">이름</label>
                            <input type="text" name="name" className="form-control" 
                                    value={pocketmon.name} onChange={changePocketmon}/>
                        </div>
                    </div>
                    
                    <div className="row mt-4">
                        <div className="col">
                            <label className="form-label">속성</label>
                            <input type="text" name="type" className="form-control" 
                                    value={pocketmon.type} onChange={changePocketmon}/>
                        </div>
                    </div>


                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={closeModal}>닫기</button>
                    {pocketmon.no === undefined  ? 
                    <button className="btn btn-success" onClick={savePocketmon}>저장</button>
                    : 
                    <button className="btn btn-success" onClick={updatePocketmon}>수정</button>
                    }
                  </div>
                </div>
            </div>
            </div>







        </>
    );
};

export default Pocketmon;