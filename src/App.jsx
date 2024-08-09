import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages'
import BottomNavbar from './components/Bottomnavbar'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route 
      path="/" 
      element={<HomePage />}
      />
       <Route 
      path="/bottombar" 
      element={<BottomNavbar />}
      />
    </Routes>
    </BrowserRouter>
  )
}

export default App
