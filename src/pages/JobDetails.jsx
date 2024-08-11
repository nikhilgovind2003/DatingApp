import { Link } from 'react-router-dom';

    const JobDetails = () => {
        return (
           
            <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
            <div className="flex justify-center items-center min-h-screen  lg:w-2/5">
                <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="mb-5 text-2xl font-bold text-center">Job Details</h2>
                    <div className="mb-4">
                        <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
                        <input type="text" id="companyName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="designation" className="block text-gray-700">Designation</label>
                        <input type="text" id="designation" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-gray-700">Location</label>
                        <input type="text" id="location" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="flex justify-center">
                        <Link to="/more_job_details" className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-center">Next</Link>
                    </div>
                </form>
            </div>
            </div>
            
        );
    }
    
    export default JobDetails;
    
