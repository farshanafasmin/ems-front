import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Add from './pages/Add';
import View from './pages/View';
import Edit from './pages/Edit';
import Header from './components/Header';


function App() {
  return (
    <>
    <Header/>
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/add' element={<Add/>}/>
      <Route path='/view/:id' element={<View/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
      
    </Routes>
    
    </>
  );
}

export default App;
