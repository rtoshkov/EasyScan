import './App.css';
import Home from "./components/Home/Home";
import {useState} from "react";
import {Routes, Route} from "react-router-dom";
import Inventory from "./components/Inventory/Inventory";

function App() {
  const [results, setResult] = useState([]);
  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<Home setResult={setResult}  results={results}/>}/>
        <Route path="/inventory" element={<Inventory  results={results} />}/>
      </Routes>
    </div>
  );
}

export default App;
