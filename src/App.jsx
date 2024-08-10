import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages'
import DesktopLayout from './layout/DesktopLayout'



function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<DesktopLayout />}>
        <Route path='/' element={<HomePage />}/>
     </Route>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
