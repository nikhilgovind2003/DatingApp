
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { 
  Accept, 
  DesignationPage, 
  Groups, 
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
  Error403, 
  Story,
  SpinPage,
  AddCreditCard,
  PartnerPreferances,
  ForgotPasswordPage,
  ResetPasswordPage
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
import SortFilter from './pages/SortFilter'
import Messages from './pages/Messages';
import Notification from "./components/NotificationBar/notificationBar"
import CreateGroup from './pages/createGroup/CreateGroup';
import DiscoverPage from './pages/DiscoverPage';
import UsersProfile from './pages/test/MyProfile';

function App() {

  const hideOnRoutes = ['/credit','/subscription', `/story/1`,'/spin','/create_group','/notification']; 

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DesktopLayout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/discover' element={<DiscoverPage />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/qualification' element={<QualificationPage />} />
          <Route path='/profileview' element={<Profileviewpage />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/paymentMethod' element={<PaymentMethods />} /> 
          <Route path='/change-password' element={<ChangePwdPage />} />
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
          <Route path='error_403' element={<Error403 />} />
          <Route path='sort_filter' element={<SortFilter />} />
          <Route path='partener_preferences' element={<PartnerPreferances />} />
          <Route path='/story/:id' element={<Story />} />
          <Route path='/spin' element={<SpinPage />} />
          <Route path='/credit' element={<AddCreditCard />} />
          <Route path='/message' element={<Messages />} />
          <Route path='*' element={<Error404 />} />
          <Route path='groups' element={<Groups />} />
          <Route path='create_group' element={<CreateGroup />} />
          <Route path='/profile/:userId' element={<UsersProfile />} />


        </Route>
        <Route path='/job_status' element={<JobStatus />} />
        <Route path='/job_details' element={<JobDetails />} />
        <Route path='/more_job_details' element={<MoreJobDetails />} />
        <Route path='/relationship_goals' element={<RelationShipGoals />} />
        <Route path='/interested' element={<Interested />} />
        <Route path='/dating_interest' element={<DatingInterest />} />
        <Route path='/personal_details' element={<PersonalDetails />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign_up' element={<SignUp />} />
        <Route path='/' element={<LandingPage />} />
      </Routes>
      <BottomNavbar show={true} hideOnRoutes={hideOnRoutes} />
    </BrowserRouter>
  );
}

export default App;
