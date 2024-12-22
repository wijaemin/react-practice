import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaRegEdit , FaPlus} from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import "./Book.css";
import { Modal } from "bootstrap";


const Book = (props)=>{
    const [bookList, setBookList] = useState([]);

    // const loadBook =()=>{
    //     //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드
    //     axios({
    //         url:"http://localhost:8080/book/",
    //         method:"get",
    //     })
    //     .then(response=>{
    //         setBookList(response.data);
    //     })
    //     .catch(err=>{
    //         window.alert("통신 오류 발생");
    //     });
    // };

    const loadBook = async()=>{
        const response =await axios({
            url:"http://localhost:8080/book/",
            method:"get",
        });
        setBookList(response.data);
    };


    useEffect(()=>{
        loadBook();
    },[]);

    const deleteBook = (book)=>{
        const choice=window.confirm("정말 삭제?");
        if(choice === false) return;

        axios({
            url:`http://localhost:8080/book/${book.bookId}`,
            method:"delete"
        })
        .then(response=>{
            loadBook();
            
        })
        .catch(err=>{});
    };

    //모달 관련 기능
    const bsModal = useRef();
    const openModal = () =>{
        const modal = new Modal(bsModal.current);
        modal.show();
    };
    const closeModal = () =>{
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
        clearBook();
    };

    //등록, 수정 관련된 state랑 기능
    const [book, setBook] = useState({
        bookTitle:"", bookAuthor:"",bookPublicationDate:"",bookPrice:0, 
        bookPublisher:"", bookPageCount:0, bookGenre:""
    });
    const changeBook = (e)=>{
        setBook({
            ...book,
            [e.target.name] : e.target.value
        });
    };
    const clearBook = ()=>{
        setBook({
            bookTitle:"", bookAuthor:"",bookPublicationDate:"",bookPrice:0, 
            bookPublisher:"", bookPageCount:0, bookGenre:""
        });
    };

    // const saveBook = ()=>{
    //     axios({
    //         url:"http://localhost:8080/book/",
    //         method:"post",
    //         data:book,
    //     })
    //     .then(response=>{
    //         loadBook();
    //         closeModal();
    //     })
    //     .catch(err=>{});
    // };

    //async 함수와 await 키워드를 사용한 간소화 작업이 가능
    //비동기 작업을 동기화된 코드로 작성 가능

    const saveBook = async() =>{
        const response= await axios({
            url:"http://localhost:8080/book/",
            method:"post",
            data:book,
        });
        loadBook();
        closeModal();
    };

    const editBook = (target)=>{
        setBook({...target});
        openModal();
    };


    // const updateBook = ()=>{
    //     //검사 후 차단 코드
    //     const copyBook={...book};
    //     delete copyBook.bookId;
    //     axios({
    //         url:`http://localhost:8080/${book.bookId}`,
    //         method:"put",
    //         data:copyBook
    //     })
    //     .then(response=>{
    //         loadBook();
    //         closeModal();
    //     })
    //     .catch(err=>{});
    // };

    const updateBook = async ()=>{
        const copyBook={...book};
        delete copyBook.bookId;
        const response = await axios({
            url:`http://localhost:8080/${book.bookId}`,
            method:"put",
            data:copyBook
        });
        loadBook();
        closeModal();
    };
    return(

        <>
            <div className="row">
                <div className="col">
                    <h1>도서 관리</h1>
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

            <div className="row mt-4">
                <div className="col">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="pc-only">번호</th>
                                <th>제목</th>
                                <th>저자</th>
                                <th className="pc-only">출판일</th>
                                <th>가격</th>
                                <th className="pc-only">출판사</th>
                                <th className="pc-only">페이지 수</th>
                                <th className="pc-only">장르</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookList.map((book, index)=>(
                                <tr>
                                    <td className="pc-only">{book.bookId}</td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.bookAuthor}</td>
                                    <td className="pc-only">{book.bookPublicationDate}</td>
                                    <td>{book.bookPrice}</td>
                                    <td className="pc-only">{book.bookPublisher}</td>
                                    <td className="pc-only">{book.bookPageCount}</td>
                                    <td className="pc-only">{book.bookGenre}</td>
                                    <td>
                                        {/* 아이콘 */}
                                        <FaRegEdit className="text-warning"
                                        onClick={e=>editBook(book)}/>
                                        <TiDelete className="text-danger" 
                                        onClick={e=>deleteBook(book)}/>
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
                        {book.bookId === undefined ? '신규 도서 등록' :`${book.bookId}번 도서 수정`}
                      </h5>
                      <button type="button" className="border-0 bg-transparent" data-bs-dismiss="modal" aria-label="Close" 
                                onClick={closeModal}>
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">

                        <div className="row">
                            <div className="col">
                                <label className="form-label">제목</label>
                                <input type="text" name="bookTitle" value={book.bookTitle} 
                                onChange={changeBook} className="form-control"/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">저자</label>
                                <input type="text" name="bookAuthor" value={book.bookAuthor} 
                                        onChange={changeBook} className="form-control"/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">출판일</label>
                                <input type="date" name="bookPublicationDate" value={book.bookPublicationDate} 
                                        onChange={changeBook} className="form-control"/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">가격</label>
                                <input type="text" name="bookPrice" value={book.bookPrice} 
                                        onChange={changeBook} className="form-control"/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">출판사</label>
                                <input type="text" name="bookPublisher" value={book.bookPublisher} 
                                onChange={changeBook} className="form-control"/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">페이지 수</label>
                                <input type="text" name="bookPageCount" value={book.bookPageCount} 
                                onChange={changeBook} className="form-control"/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">장르</label>
                                <select name="bookGenre" value={book.bookGenre} onChange={changeBook} 
                                        className="form-select">
                                    <option value="">선택하세요</option>
                                    <option>다큐</option>
                                    <option>판타지/무협</option>
                                    <option>소설</option>
                                    <option>자서전</option>
                                    <option>로맨스</option>
                                    <option>수필</option>
                                    <option>추리</option>
                                </select>
                            </div>
                        </div>


                  </div>
                  <div className="modal-footer">
                    
                    <button className="btn btn-secondary" onClick={closeModal}>
                        닫기
                    </button>

                    {book.bookId === undefined ? 
                    <button className="btn btn-success" onClick={saveBook}>
                    저장
                    </button>
                    :
                    <button className="btn btn-success" onClick={updateBook}>
                    수정
                    </button>
                    }

                  </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default Book;