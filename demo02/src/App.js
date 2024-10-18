import hi from './hi.jpg';

function App() {
  var width=300;
  var height=300;
  return (
    <>
      <h1>하이 리액트</h1>
      <img src={hi} width={width} height={height}/>
    </>
  );
}

export default App;
