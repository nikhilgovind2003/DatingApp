import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages'
import { UserIcon } from './Components'

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
          element={<UserIcon
            stroy={false}
            edit={false} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
