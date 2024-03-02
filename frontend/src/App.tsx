import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Home from './pages/Home';
import PdfDetails from './pages/PdfDetails';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/pdf/:id' element={<PdfDetails />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/upload' element={<Upload />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
