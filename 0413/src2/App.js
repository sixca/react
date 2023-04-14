import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';

import Layout from './layout/Layout.js';
import Home from './component/Home.js';
import BoardList from './component/board/BoardList';
import BoardWrite from './component/board/BoardWrite';
import ScoreList from './component/score/ScoreList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route index element={<Home/>}/>
            <Route path="/score/list" element={<ScoreList/>}/>
            {/* <Route path="/board/list" element={<BoardList/>}/>
            <Route path="/board/write" element={<BoardWrite/>}/>
            <Route path="/board/view/:id" element={<BoardWrite/>}/> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
