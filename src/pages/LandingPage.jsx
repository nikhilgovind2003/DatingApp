import { LuPhoneCall } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/auth/authSlice";

const LandingPage = () => {
  const dispatch = useDispatch();
  const google = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  }

  return (
    <div className="text-sm px-4 text-center lg:px-20 lg:text-left lg:flex lg:items-center lg:justify-between lg:h-screen">
      <div className="lg:w-1/2">
        <img
          src="LandingPageimage.png"
          alt="img"
          className="w-full h-auto max-w-md mx-auto lg:max-w-none lg:mx-0"
        />
      </div>
      <div className="lg:w-1/2 lg:pl-12">
        <div className="text-2xl font-semibold lg:text-4xl md:text-3xl lg:mt-0 mt-8">
          <p>Let's meet new</p>
          <p>people around you</p>
        </div>

        <Link
          className="flex items-center justify-center gap-4 bg-[#4B164C] text-white p-4 rounded-full text-sm mt-8 lg:mt-12 lg:text-lg md:text-md lg:w-3/4 mx-auto lg:mx-0"
          to="/login"
        >
          <LuPhoneCall />
          Login with Email/Phone
        </Link>

        <Link
        onClick={google}
          className="flex items-center justify-center gap-4 bg-[#dabbd5] font-semibold text-[#4B164C] p-4 rounded-full text-sm mt-4 lg:text-xl lg:w-3/4 mx-auto lg:mx-0"
        >
          <FcGoogle />
          Login with Google
        </Link>

        <div className="flex  mt-8 lg:mt-12 w-full text-center text-sm md:text-md lg:text-lg p-2">
          Don't have an account?{" "}
          <Link className="text-[#DD88CF] ml-2" to="/sign_up">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
