import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// Lazy loaded components
const DiscoverPage = lazy(() => import("./pages/DiscoverPage"));
const QualificationPage = lazy(() => import("./pages/QualificationPage"));
const Profileviewpage = lazy(() => import("./pages/Profileviewpage"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const PaymentMethods = lazy(() => import("./pages/PaymentMethods"));
const ChangePwdPage = lazy(() => import("./pages/ChangePwdPage"));
const EditProfilePage = lazy(() => import("./pages/EditProfilePage"));
const PrivacyandSettingspage = lazy(
  () => import("./pages/PrivacyandSettingspage"),
);
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const DesignationPage = lazy(() => import("./pages/DesignationPage"));
const UsersProfile = lazy(() => import("./pages/test/MyProfile"));
const MatchPage = lazy(() => import("./pages/MatchPage"));
const SearchPage = lazy(() => import("./pages/search/SearchPage"));
const SubscriptionPage = lazy(() => import("./pages/SubscriptionPage"));
const Sent = lazy(() => import("./pages/Sent/Sent"));
const Accept = lazy(() => import("./pages/Accept/Accept"));
const RejectPage = lazy(() => import("./pages/RejectPage"));
const ReceivePage = lazy(() => import("./pages/ReceivePage"));
const ShortlistPage = lazy(() => import("./pages/ShortlistPage"));
const ShortlistByPage = lazy(() => import("./pages/ShortlistedByPage"));
const ContactedPage = lazy(() => import("./pages/ContactedPage"));
const ViewedMyProfilePage = lazy(() => import("./pages/ViewedMyProfile"));
const Error404 = lazy(() => import("./pages/Error404"));
const Error403 = lazy(() => import("./pages/Error403"));
const SortFilter = lazy(() => import("./pages/SortFilter"));
const PartnerPreferances = lazy(() => import("./pages/PartnerPreferances"));
const Story = lazy(() => import("./pages/Story"));
const SpinPage = lazy(() => import("./pages/SpinPage/SpinPage"));
const AddCreditCard = lazy(() => import("./pages/AddCreditCard"));
const Messages = lazy(() => import("./pages/Messages"));
const Groups = lazy(() => import("./pages/groups/Groups"));
const CreateGroup = lazy(() => import("./pages/createGroup/CreateGroup"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const JobStatus = lazy(() => import("./pages/JobStatus"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const MoreJobDetails = lazy(() => import("./pages/MoreJobDetails"));
const RelationShipGoals = lazy(() => import("./pages/RelationShipGoals"));
const Interested = lazy(() => import("./pages/Interested"));
const DatingInterest = lazy(() => import("./pages/DatingInterest"));
const PersonalDetails = lazy(() => import("./pages/PersonalDetails"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUp = lazy(() => import("./pages/SignUp"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const GoogleCallback = lazy(() => import("./pages/GoogleCallback"));

import DesktopLayout from "./layout/DesktopLayout";
import BottomNavbar from "./components/BottomNavbar";
import Notification from "./components/NotificationBar/notificationBar";
import ProtectedRouter from "./utils/ProtectedRouter";
import ProtectedPrimeRouter from "./utils/ProtectedPrimeRouter";
import { useSelector } from "react-redux";
import { SocketProvider } from "./context/SocketContext";
import GlobalLocationHandler from "./components/GlobalLocationHandler";
import HomePage from "./pages/HomePage";

function App() {
  const isAuthenticated = useSelector((state) => {
    console.log(
      "state.userAuth.isAuthenticated",
      state.userAuth.isAuthenticated,
    );
    return state.userAuth.isAuthenticated;
  });
  const isPrime = useSelector((state) =>
    state.userAuth.userInfo?.isPrime ? true : false,
  );
  const hideOnRoutes = [
    "/credit",
    "/subscription",
    `/chat`,
    `/story/1`,
    "/spin",
    "/create_group",
    "/notification",
    "/partener_preferences",
    "/",
    "/login",
    "/sign_up",
    "/personal_details",
    "/interested",
    "/dating_interest",
    "/job_status",
    "/job_details",
    "/profile/edit",
  ];

  console.log("Auth", isAuthenticated);

  return (
    <SocketProvider>
      <GlobalLocationHandler />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route element={<DesktopLayout />}>
              <Route
                path="/home"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <HomePage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/discover"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <DiscoverPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/notification"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <Notification />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/qualification"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <QualificationPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/profileview"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <Profileviewpage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <MyProfile />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/paymentMethod"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <PaymentMethods />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/change-password"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <ChangePwdPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/profile/edit"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <EditProfilePage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/privacyandsetting"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <PrivacyandSettingspage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <SettingsPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/location"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <LocationPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/designation"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <DesignationPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/profile-views"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <UsersProfile />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/match"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <MatchPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/test"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <SearchPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/subscription"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <SubscriptionPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/sent"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <Sent />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/accept"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <Accept />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/reject"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <RejectPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/received"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <ReceivePage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/shortlisted"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <ShortlistPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/shortlisted-by"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <ShortlistByPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/contacted"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <ContactedPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/profile-viewed"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <ViewedMyProfilePage />
                  </ProtectedRouter>
                }
              />
              <Route path="error_403" element={<Error403 />} />
              <Route
                path="sort_filter"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <SortFilter />
                  </ProtectedRouter>
                }
              />
              <Route
                path="partener_preferences"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <PartnerPreferances />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/story/:id"
                element={
                  <ProtectedPrimeRouter
                    isAuthenticated={isAuthenticated}
                    isPrime={isPrime}
                  >
                    <Story />
                  </ProtectedPrimeRouter>
                }
              />
              <Route
                path="/spin"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <SpinPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/credit"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <AddCreditCard />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/message"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <Messages />
                  </ProtectedRouter>
                }
              />
              <Route path="*" element={<Error404 />} />
              <Route
                path="groups"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <Groups />
                  </ProtectedRouter>
                }
              />
              <Route
                path="create_group"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <CreateGroup />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/profile/:userId"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <UsersProfile />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRouter isAuthenticated={isAuthenticated}>
                    <SearchPage />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/chat/:id"
                element={
                  <ProtectedRouter
                    isAuthenticated={isAuthenticated}
                    isPrime={isPrime}
                  >
                    <Chat />
                  </ProtectedRouter>
                }
              />
            </Route>
            <Route path="/job_status" element={<JobStatus />} />
            <Route path="/job_details" element={<JobDetails />} />
            <Route path="/more_job_details" element={<MoreJobDetails />} />
            <Route path="/relationship_goals" element={<RelationShipGoals />} />
            <Route path="/interested" element={<Interested />} />
            <Route path="/dating_interest" element={<DatingInterest />} />
            <Route path="/personal_details" element={<PersonalDetails />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/auth/callback" element={<GoogleCallback />} />
            <Route
              path="/"
              element={
                <ProtectedRouter isAuthenticated={isAuthenticated}>
                  isAuthenticated ? <Navigate to="/home" /> : <LandingPage />
                </ProtectedRouter>
              }
            />
          </Routes>
        </Suspense>
        <BottomNavbar show={true} hideOnRoutes={hideOnRoutes} />
      </BrowserRouter>
    </SocketProvider>
  );
}

export { App };
