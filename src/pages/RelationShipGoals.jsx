import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RelationshipGoals = () => {
    const [selectedGoal, setSelectedGoal] = useState(""); // State to track selected option
    const navigate = useNavigate(); // Hook to navigate to different routes

    const handleNext = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch('http://localhost:5000/api/v1/users/relationship-goals', { relationshipGoal: selectedGoal })
            const json = response.data
            console.log(json);
            
          } catch (err) {
            console.log(err)
          }

        if (selectedGoal === "short-term") {
            navigate('/interested');
        } else if (selectedGoal === "long-term") {
            navigate('/matrimony');
        } else {
            alert("Please select a relationship goal.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
            <div className="flex justify-center items-center min-h-screen bg-opacity-50 p-4 lg:w-2/5">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="mb-5 text-2xl font-bold text-center">Relationship Goals</h2>
                    <form onSubmit={handleNext}>
                        <div className="mb-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="relationshipGoal"
                                    value="short-term"
                                    checked={selectedGoal === "short-term"}
                                    onChange={(e) => setSelectedGoal(e.target.value)}
                                    className="mr-2"
                                />
                                <span>Short Term Relationship</span>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="relationshipGoal"
                                    value="long-term"
                                    checked={selectedGoal === "long-term"}
                                    onChange={(e) => setSelectedGoal(e.target.value)}
                                    className="mr-2"
                                />
                                <span>Long Term Relationship</span>
                            </label>
                        </div>

                        <div className="flex justify-center">
                            <button type="submit" className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-center">
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RelationshipGoals;
