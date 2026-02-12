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
  ResetPasswordPage,
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
import SortFilter from './pages/SortFilter';
import Messages from './pages/Messages';
import Notification from "./components/NotificationBar/notificationBar";
import CreateGroup from './pages/createGroup/CreateGroup';
import DiscoverPage from './pages/DiscoverPage';
import UsersProfile from './pages/test/MyProfile';
import SearchPage from './pages/search/SearchPage';
import Chat from './pages/chat/Chat';
import ProtectedRouter from './utils/ProtectedRouter';
import ProtectedPrimeRouter from './utils/ProtectedPrimeRouter';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { SOCKET_URL } from './apiConfig';

const socket = io(SOCKET_URL);

function App() {
  const isAuthenticated = useSelector(state => state.userAuth.isAuthenticated);
  const isPrime = useSelector(state => state.userAuth.userInfo?.isPrime ? true : true);
  console.log(isPrime, 'prime')
  const hideOnRoutes = ['/credit', '/subscription', `/chat`, `/story/1`, '/spin', '/create_group', '/notification', '/partener_preferences', '/', '/login', '/sign_up', '/personal_details', '/interested', '/dating_interest', '/job_status', '/job_details', '/editprofile'];

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DesktopLayout />}>
          <Route path='/home' element={<ProtectedRouter isAuthenticated={isAuthenticated}><HomePage /></ProtectedRouter>} />
          <Route path='/discover' element={<ProtectedRouter isAuthenticated={isAuthenticated}><DiscoverPage /></ProtectedRouter>} />
          <Route path='/notification' element={<ProtectedRouter isAuthenticated={isAuthenticated}><Notification socket={socket} /></ProtectedRouter>} />
          <Route path='/qualification' element={<ProtectedRouter isAuthenticated={isAuthenticated}><QualificationPage /></ProtectedRouter>} />
          <Route path='/profileview' element={<ProtectedRouter isAuthenticated={isAuthenticated}><Profileviewpage /></ProtectedRouter>} />
          <Route path='/profile' element={<ProtectedRouter isAuthenticated={isAuthenticated}><MyProfile /></ProtectedRouter>} />
          <Route path='/paymentMethod' element={<ProtectedRouter isAuthenticated={isAuthenticated}><PaymentMethods /></ProtectedRouter>} />
          <Route path='/change-password' element={<ProtectedRouter isAuthenticated={isAuthenticated}><ChangePwdPage /></ProtectedRouter>} />
          <Route path='/editprofile' element={<ProtectedRouter isAuthenticated={isAuthenticated}><EditprofilePage /></ProtectedRouter>} />
          <Route path='/privacyandsetting' element={<ProtectedRouter isAuthenticated={isAuthenticated}><PrivacyandSettingspage /></ProtectedRouter>} />
          <Route path='/settings' element={<ProtectedRouter isAuthenticated={isAuthenticated}><SettingsPage /></ProtectedRouter>} />
          <Route path='/location' element={<ProtectedRouter isAuthenticated={isAuthenticated}><LocationPage /></ProtectedRouter>} />
          <Route path='/designation' element={<ProtectedRouter isAuthenticated={isAuthenticated}><DesignationPage /></ProtectedRouter>} />
          <Route path='/profile-views' element={<ProtectedRouter isAuthenticated={isAuthenticated}><UsersProfile /></ProtectedRouter>} />
          <Route path='/match' element={<ProtectedRouter isAuthenticated={isAuthenticated}><MatchPage /></ProtectedRouter>} />
          <Route path='/test' element={<ProtectedRouter isAuthenticated={isAuthenticated}><SearchPage /></ProtectedRouter>} />
          <Route path='/subscription' element={<ProtectedRouter isAuthenticated={isAuthenticated}><SubscriptionPage /></ProtectedRouter>} />
          <Route path='/sent' element={<ProtectedRouter isAuthenticated={isAuthenticated}><Sent /></ProtectedRouter>} />
          <Route path='/accept' element={<ProtectedRouter isAuthenticated={isAuthenticated}><Accept /></ProtectedRouter>} />
          <Route path='/reject' element={<ProtectedRouter isAuthenticated={isAuthenticated}><RejectPage /></ProtectedRouter>} />
          <Route path='/received' element={<ProtectedRouter isAuthenticated={isAuthenticated}><ReceivePage /></ProtectedRouter>} />
          <Route path='/shortlisted' element={<ProtectedRouter isAuthenticated={isAuthenticated}><ShortlistPage /></ProtectedRouter>} />
          <Route path='/shortlisted-by' element={<ProtectedRouter isAuthenticated={isAuthenticated}><ShortlistByPage /></ProtectedRouter>} />
          <Route path='/contacted' element={<ProtectedRouter isAuthenticated={isAuthenticated}><ContactedPage /></ProtectedRouter>} />
          <Route path='/profile-viewed' element={<ProtectedRouter isAuthenticated={isAuthenticated}><ViewedMyProfilePage /></ProtectedRouter>} />
          <Route path='error_403' element={<Error403 />} />
          <Route path='sort_filter' element={<ProtectedRouter isAuthenticated={isAuthenticated}><SortFilter /></ProtectedRouter>} />
          <Route path='partener_preferences' element={<ProtectedRouter isAuthenticated={isAuthenticated}><PartnerPreferances /></ProtectedRouter>} />
          <Route path='/story/:id' element={<ProtectedPrimeRouter isAuthenticated={isAuthenticated} isPrime={isPrime}><Story /></ProtectedPrimeRouter>} />
          <Route path='/spin' element={<ProtectedRouter isAuthenticated={isAuthenticated}><SpinPage /></ProtectedRouter>} />
          <Route path='/credit' element={<ProtectedRouter isAuthenticated={isAuthenticated}><AddCreditCard /></ProtectedRouter>} />
          <Route path='/message' element={<ProtectedRouter isAuthenticated={isAuthenticated}><Messages /></ProtectedRouter>} />
          <Route path='*' element={<Error404 />} />
          <Route path='groups' element={<ProtectedRouter isAuthenticated={isAuthenticated}><Groups /></ProtectedRouter>} />
          <Route path='create_group' element={<ProtectedRouter isAuthenticated={isAuthenticated}><CreateGroup /></ProtectedRouter>} />
          <Route path='/profile/:userId' element={<ProtectedRouter isAuthenticated={isAuthenticated}><UsersProfile /></ProtectedRouter>} />
          <Route path='/search' element={<ProtectedRouter isAuthenticated={isAuthenticated}><SearchPage /></ProtectedRouter>} />
          <Route path='/chat/:id' element={<ProtectedPrimeRouter isAuthenticated={isAuthenticated} isPrime={isPrime}><Chat /></ProtectedPrimeRouter>} />
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

export { App, socket };
