import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import DeletedNotes from './components/DeletedNotes';
import Home from './pages/Home';
function App() {
  return (
    <>
    <Routes>
      <Route path='/home' element={<Home/>} />
      <Route path='/' element={<Auth />} />
      <Route path='/register' element={<Auth register/>} />
      <Route path='/deleted-notes' element={<DeletedNotes/>}/>
    </Routes>
    </>
  );
}

export default App;
