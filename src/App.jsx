
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage, QualificationPage } from './pages'
import DesktopLayout from './layout/DesktopLayout'
import ChangePwdPage from './pages/ChangePwdPage';
import EditprofilePage from './pages/EditprofilePage';
import PrivacyandSettingspage from './pages/PrivacyandSettingspage';
import SettingsPage from './pages/SettingsPage';
import BottomNavbar from './components/BottomNavbar';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DesktopLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/qualification' element={<QualificationPage />} />
          <Route path='/changepwd' element={<ChangePwdPage />} />
          <Route path='/editprofile' element={<EditprofilePage />} />
          <Route path='/privacyandsetting' element={<PrivacyandSettingspage />} />
          <Route path='/settings' element={<SettingsPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
