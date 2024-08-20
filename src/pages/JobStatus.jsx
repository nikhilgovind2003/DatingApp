import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const JobStatus = () => {
    const navigate = useNavigate();

 const [Jobstatus,SetJobstatus]= useState("");

 const handleChange=(e)=>{

          SetJobstatus(e.target.id);

 }

 const handleSubmit=(e)=>{
      e.preventDefault();
      if(!Jobstatus){
        alert("job status required")
        return;
      }

      if(Jobstatus === 'employee'||Jobstatus==='employer'){
            
        navigate('/job_details');
        console.log(Jobstatus)
        return;
      }
      else{
        
        navigate('/more_job_details')
        
       console.log(Jobstatus)
        return;
      }
 
 }
  
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
        <div className="flex justify-center items-center min-h-screen lg:w-2/5">
            <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl" onSubmit={handleSubmit}>
                <h2 className="mb-5 text-2xl font-bold text-center">Job Status</h2>
                <div className="mb-4">
                    <input className="mr-2" type="checkbox" id="employer" onChange={handleChange}  checked={Jobstatus === 'employer'}  />
                    <label className="form-check-label" htmlFor="employer">
                        Employer
                    </label>
                </div>
                <div className="mb-4">
                    <input className="mr-2" type="checkbox" id="employee" onChange={handleChange} checked={Jobstatus === 'employee'} />
                    <label className="form-check-label" htmlFor="employee">
                        Employee
                    </label>
                </div>
                <div className="mb-4">
                    <input className="mr-2" type="checkbox" id="jobSeeker"  onChange={handleChange} checked={Jobstatus === 'jobSeeker'} />
                    <label className="form-check-label" htmlFor="jobSeeker">
                        Job Seeker
                    </label>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                        Next
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default JobStatus;
