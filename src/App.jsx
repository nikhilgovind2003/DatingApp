import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { 
  Accept, 
  DesignationPage, 
  Group, 
  LocationPage, 
  MatchPage, 
  QualificationPage, 
  Sent, 
  ViewedMyProfilePage, 
  HomePage, 
  JobDetails, 
  JobStatus, 
  MoreJobDetails, 
  RelationShipGoals, 
  PersonalDetails, 
  Interested, 
  DatingInterest, 
  LoginPage, 
  SignUp, 
  LandingPage, 
  RejectPage, 
  ReceivePage, 
  ShortlistPage, 
  ShortlistByPage, 
  ContactedPage, 
  Error404, 
  Error403 
} from './pages';
import DesktopLayout from './layout/DesktopLayout';
import Profileviewpage from './pages/Profileviewpage';
import MyProfile from './pages/MyProfile';
import PaymentMethods from './pages/PaymentMethods'; 
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
          <Route path='/profileview' element={<Profileviewpage />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/paymentMethod' element={<PaymentMethods />} /> 
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
          <Route path='/sent' element={<Sent />} />
          <Route path='/accept' element={<Accept />} />
          <Route path='/reject' element={<RejectPage />} />
          <Route path='/received' element={<ReceivePage />} />
          <Route path='/shortlisted' element={<ShortlistPage />} />
          <Route path='/shortlisted-by' element={<ShortlistByPage />} />
          <Route path='/contacted' element={<ContactedPage />} />
          <Route path='/profile-viewed' element={<ViewedMyProfilePage />} />
          <Route path='/error_404' element={<Error404 />} />
          <Route path='/error_403' element={<Error403 />} />
        </Route>
        <Route path='/job_status' element={<JobStatus />} />
        <Route path='/job_details' element={<JobDetails />} />
        <Route path='/more_job_details' element={<MoreJobDetails />} />
        <Route path='/relationship_goals' element={<RelationShipGoals />} />
        <Route path='/interested' element={<Interested />} />
        <Route path='/dating_interest' element={<DatingInterest />} />
        <Route path='/personal_details' element={<PersonalDetails />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign_up' element={<SignUp />} />
        <Route path='/landing_page' element={<LandingPage />} />
      </Routes>
      <BottomNavbar />
    </BrowserRouter>
  );
}

export default App;
