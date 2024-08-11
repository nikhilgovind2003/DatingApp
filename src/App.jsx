import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage, JobDetails, JobStatus, MoreJobDetails, RelationShipGoals, PersonalDetails,Interested,DatingInterest,LoginPage,SignUp,LandingPage} from './pages'
import DesktopLayout from './layout/DesktopLayout'




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DesktopLayout />}>
          <Route path='/' element={<HomePage />} />
        </Route>
        <Route path='job_status' element={<JobStatus />} />
        <Route path='job_details' element={<JobDetails />} />
        <Route path='more_job_details' element={<MoreJobDetails />} />
        <Route path='relationship_goals' element={<RelationShipGoals />} />
        <Route path='interested' element={<Interested />} />
        <Route path='dating_interest' element={<DatingInterest />} />
        <Route path='personal_details' element={<PersonalDetails />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='sign_up' element={<SignUp />} />
        <Route path='landing_page' element={<LandingPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
