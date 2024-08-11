import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { DesignationPage, HomePage, LocationPage, MatchPage, QualificationPage, ViewedMyProfilePage } from './pages'
import DesktopLayout from './layout/DesktopLayout'
import { SubHeader } from './Components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DesktopLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/qualification' element={<QualificationPage />} />
          <Route path='/location' element={<LocationPage />} />
          <Route path='/designation' element={<DesignationPage />} />
          <Route path='/profile-views' element={<ViewedMyProfilePage />} />
          <Route path='/match' element={<MatchPage />} />
          <Route path='/test' element={<SubHeader />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
