import Exam01 from "./components/Exam01";
import Exam02 from "./components/Exam02";
import Exam03 from "./components/Exam03";
import Exam04 from "./components/Exam04";
import Exam05 from "./components/Exam05";
import Exam06 from "./components/Exam06";
import Exam07 from "./components/Exam07";
import Exam08 from "./components/Exam08";
import Exam09 from "./components/Exam09";
function App() {
  return (
    <>
      <h1>리액트 예제</h1>
      <hr/>
      <Exam01/>
      <hr/>
      <Exam02/>
      <hr/>
      <Exam03/>
      <hr/>
      <Exam04/>
      <hr/>
      <Exam05/>
      <hr/>
      <Exam06/>
      <hr/>
      <Exam07/>
      <hr/>
      <Exam08/>
      <hr/>
      <Exam09/>
      <hr/>
      {/* 
        y = 수직 
        my = 상하 마진 5단계
        py = 상하 패딩 5단계
      */}
      <div className="my-5 py-5"></div>

    </>

  );
}

export default App;
