import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import "./Book.css";


const Book = (props)=>{
    const [bookList, setBookList] = useState([]);

    const loadBook =()=>{
        //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드
        axios({
            url:"http://localhost:8080/book/",
            method:"get",
        })
        .then(response=>{
            setBookList(response.data);
        })
        .catch(err=>{
            window.alert("통신 오류 발생");
        });
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
    return(

        <>
            <div className="row">
                <div className="col">
                    <h1>도서 관리</h1>
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
                                        <FaRegEdit className="text-warning"/>
                                        <TiDelete className="text-danger" 
                                        onClick={e=>deleteBook(book)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Book;