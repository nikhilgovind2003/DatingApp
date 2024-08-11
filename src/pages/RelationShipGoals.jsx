import { Link } from 'react-router-dom';

const RelationshipGoals = () => {
    return (
        
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
        <div className="flex justify-center items-center min-h-screen  bg-opacity-50 p-4  lg:w-2/5">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="mb-5 text-2xl font-bold text-center">Relationship Goals</h2>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input type="checkbox" checked className="mr-2" />
                        <span>Short Term Relationship</span>
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input type="checkbox"  className="mr-2" />
                        <span>Long Term Relationship</span>
                    </label>
                </div>
                <div className="flex justify-center">
                    <Link to="interested" className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-center">Next</Link>
                </div>
            </div>
           </div>
        </div>
    );
}

export default RelationshipGoals;
