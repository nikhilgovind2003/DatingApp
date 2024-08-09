import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages'
import { UserSetting } from './Components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/test"
          element={<UserSetting/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
