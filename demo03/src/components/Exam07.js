import { useEffect, useState } from "react";

const Exam07 = ()=>{

    //객체로 상태 변수를 정의
    const[member, setMember] = useState({//입력 데이터
        email:"",
        password:"",
        checkPw:""
    });

    const[result, setResult] = useState({//검사결과
        email:null,
        password:null,
        checkPw:null
    });


    //입력 데이터가 변하면 검사결과가 자동으로 계산되도록 처리
    const checkMember=()=>{
        // console.log("하이");
        //email 검사
        const emailRegex =/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;//이메일 정규식
        const emailMatch = member.email.length === 0 ? null : emailRegex.test(member.email);

        //password 검사
        const passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$])[A-Za-z0-9!@#$]{8,16}$/;
        const passwordMatch = member.password.length === 0 ? null :passwordRegex.test(member.password);
        //checkPw 검사
        const checkPwMatch =  member.checkPw.length === 0 ? null :
                                member.password.length > 0 && 
                                member.password === member.checkPw;
        
        setResult({
            email:emailMatch,
            password:passwordMatch,
            checkPw:checkPwMatch
        });
    }

    // useEffect(checkMember,[member]);

    //객체의 상태를 한 번에 변경하는 함수를 구현

    const changeMember = (e)=>{
        setMember({
            ...member,
            [e.target.name] : e.target.value
        });
    };

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 offset-md-1">

                        {/* 점보트론 */}
                        <div className="p-4 text-light bg-dark rounded">
                            <h1>회원가입 화면 예제</h1>
                        </div>

                        <form autoComplete="off">
                            <div className="row mt-4">
                                <div className="col">
                                    <label className="form-label">이메일</label>
                                    <input type="text" name="email" 
                                            className={
                                                `form-control 
                                                ${result.email ===true ? 'is-valid' : ''}
                                                ${result.email ===false ? 'is-invalid' : ''}
                                                `
                                            }
                                            value={member.email} onChange={changeMember}
                                            onBlur={checkMember}/>
                                    <div className="valid-feedback">올바른 형식의 이메일입니다</div>
                                    <div className="invalid-feedback">사용할 수 없는 이메일입니다</div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label className="form-label">비밀번호</label>
                                    <input type="password" name="password" className={
                                            `
                                            form-control 
                                            ${result.password ===true ? 'is-valid' : ''}
                                            ${result.password ===false ? 'is-invalid' : ''}
                                            `
                                    } 
                                            value={member.password} onChange={changeMember} 
                                            onBlur={checkMember}/>
                                    <div className="valid-feedback">올바른 형식의 비밀번호입니다</div>
                                    <div className="invalid-feedback">올바르지 않은 비밀번호 형식입니다</div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label className="form-label">비밀번호 확인</label>
                                    <input type="password" name="checkPw" className={
                                        `
                                        form-control
                                        ${result.checkPw ===true ? 'is-valid' : ''}
                                        ${result.checkPw ===false ? 'is-invalid' : ''}
                                        `
                                    }
                                            value={member.checkPw} onChange={changeMember}
                                            onBlur={checkMember}/>
                                    <div className="valid-feedback">비밀번호가 일치합니다</div>
                                    <div className="invalid-feedback">비밀번호가 일치하지 않습니다</div>                                            
                                </div>
                            </div>
                        </form>

                        <div className="row mt-4">
                            <div className="col">
                                <button type="button" className="btn btn-primary w-100" 
                                        disabled={!(result.email===true && result.password===true && result.checkPw===true)}>회원가입</button>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    );
};

export default Exam07;