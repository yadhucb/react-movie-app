import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Search from './components/Search';

function App() {
  const [search, setSearch] = useState()
  return (
    <div className='w-100'>
      <BrowserRouter>
     <NavBar setSearch = {setSearch}/>
     <Routes>
       <Route path='/search' element={<Search search = {search}/>}/>
       <Route path='/' element={<Home/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
