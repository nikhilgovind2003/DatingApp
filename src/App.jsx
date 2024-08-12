import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages'
import DesktopLayout from './layout/DesktopLayout'
import PaymentMethods from './pages/PaymentMethods' 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DesktopLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path="/paymentMethod" element={<PaymentMethods />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
