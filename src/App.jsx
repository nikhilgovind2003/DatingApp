import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { DesignationPage, HomePage, LocationPage, MatchPage, QualificationPage, ViewedMyProfilePage } from './pages'
import DesktopLayout from './layout/DesktopLayout'
import ChangePwdPage from './pages/ChangePwdPage';
import EditprofilePage from './pages/EditprofilePage';
import PrivacyandSettingspage from './pages/PrivacyandSettingspage';
import SettingsPage from './pages/SettingsPage';
import BottomNavbar from './components/BottomNavbar';
import { SubHeader } from './Components';
import SubscriptionPage from './pages/SubscriptionPage';

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
          <Route path='/location' element={<LocationPage />} />
          <Route path='/designation' element={<DesignationPage />} />
          <Route path='/profile-views' element={<ViewedMyProfilePage />} />
          <Route path='/match' element={<MatchPage />} />
          <Route path='/test' element={<SubHeader />} />
          <Route path='/subscription' element={<SubscriptionPage />} />

        </Route>
      </Routes>
      <BottomNavbar />
    </BrowserRouter>
  );
}

export default App;
