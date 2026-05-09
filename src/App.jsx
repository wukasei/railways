import './App.css'
import { Routes, Route, Link } from 'react-router-dom'; 
import Booking from './pages/Booking';
import Home from './pages/Home';

function App() {
 return(
  <div>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/booking/:trainId' element={<Booking />}/>
    </Routes>
  </div>
 )
}

export default App
