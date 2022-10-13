import './App.css';
import Home from "./components/Home/Home";
import {useState} from "react";
import ResultWindow from "./components/ResultWindow/ResultWindow";

function App() {
  const [results, setResult] = useState([]);
  return (
    <div className="App" >
    <Home setResult={setResult} results={results}/>
    <ResultWindow results={results}/>
    </div>
  );
}

export default App;
