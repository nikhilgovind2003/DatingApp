import React from 'react';
import { Link } from 'react-router-dom';

const JobStatus = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
        <div className="flex justify-center items-center min-h-screen lg:w-2/5">
            <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                <h2 className="mb-5 text-2xl font-bold text-center">Job Status</h2>
                <div className="mb-4">
                    <input className="mr-2" type="checkbox" id="employer" />
                    <label className="form-check-label" htmlFor="employer">
                        Employer
                    </label>
                </div>
                <div className="mb-4">
                    <input className="mr-2" type="checkbox" id="employee" />
                    <label className="form-check-label" htmlFor="employee">
                        Employee
                    </label>
                </div>
                <div className="mb-4">
                    <input className="mr-2" type="checkbox" id="jobSeeker" />
                    <label className="form-check-label" htmlFor="jobSeeker">
                        Job Seeker
                    </label>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                        <Link to="/job_details" className="text-white no-underline">Next</Link>
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default JobStatus;
