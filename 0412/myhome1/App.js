import logo from './logo.svg';
import './App.css';
import HelloComponent from './component/HelloComponent';
import Iftest1 from './component/iftest1';
import Fortest1 from './component/Fortest1';
import Fortest2 from './component/Fortest2';
import Hero from './component/Hero';
import Gugudan2 from './component/Gugudan2';
import HeroList from './component/HeroList';
import HeroWrite from './component/HeroWrite';

function App() {
  return (
    <div className="App">
     <h1 className='title'>제목1</h1>
     {/* <HelloComponent/> */}
     {/* <Iftest1/> */}
     {/* <Fortest1/> */}
     {/* <Fortest2/> */}
     {/* <Hero/> */}
     <HeroList/>
     <HeroWrite/>
     {/* <Gugudan2/> */}

    </div>
  );
}

export default App;
