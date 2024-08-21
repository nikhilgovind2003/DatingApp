import axios from "axios";
import { useNavigate } from "react-router-dom";

const DatingInterest = () => {
  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    let interest = e.target.value;
    await axios
      .patch("http://localhost:5000/api/v1/users/set-interest", { interest }, { withCredentials: true })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('IMAGES/DaIntBackImg1.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
      <div className="flex justify-center items-center min-h-screen p-4 lg:w-2/5 w-full">
        <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="mb-5 text-2xl font-bold text-center">Interested in</h2>

          <div className="mb-4">
            <button
              onClick={onHandleSubmit}
              value="MEN"
              className="w-full py-2 mb-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              MEN
            </button>
          </div>
          <div className="mb-4">
            <button
              onClick={onHandleSubmit}
              value="WOMEN"
              className="w-full py-2 mb-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              WOMEN
            </button>
          </div>
          <div className="mb-4">
            <button
              onClick={onHandleSubmit}
              value="BOTH"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              BOTH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DatingInterest;
