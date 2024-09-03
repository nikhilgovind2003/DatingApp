import { ArrowLeft, CircleX, MessageSquare, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Upgrade from "./../components/upgrademore/Upgrade";
import { useLocation, useNavigate } from "react-router-dom";
import { UserIcon } from "../Components";

export default function Story() {
  const [clicked, setClicked] = useState(false);
  const [story, setStory] = useState({});
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getStory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/story/${path}`);
        setStory(res.data);
      } catch (error) {
        console.error("Failed to load story:", error);
      }
    };
    getStory();
  }, [path]);

  const videoUrl = story?.reel?.url;
  const profileImageUrl = story?.profileImage?.url;

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }

    if (progress >= 50) {
      setClicked(true);
      videoRef.current.pause();
    }
  };

  // Navigate to home page if progress bar is full
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => navigate("/home"), 500); // Small delay for smoothness
    }
  }, [progress, navigate]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };


  console.log(profileImageUrl);
  
  return (
    <div className="relative flex flex-col h-screen bg-cover bg-center w-full mx-auto items-center">
      {videoUrl ? (
        <>
          <div className="w-full px-4 absolute top-10">
            <div className="relative h-1 rounded-lg bg-gray-700">
              <div
                className="absolute top-0 left-0 h-1 bg-primary"
                style={{
                  width: `${progress}%`,
                  transition: "width 0.2s linear", // Smooth transition with linear effect
                }}
              />
            </div>
          </div>
          <video
            ref={videoRef}
            className="flex-grow w-full h-screen object-cover"
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      ) : (
        <div className="flex items-center justify-center h-full w-full text-white">
          Loading...
        </div>
      )}

      {/* Header */}
      <header
        onClick={() => setClicked(true)}
        className="absolute top-0 left-0 ml-5 flex items-center w-full md:w-1/3 bg-opacity-50 text-white py-4 z-10 cursor-pointer"
      >
        <ArrowLeft />
        <UserIcon url={profileImageUrl} story={true} />
      </header>

      {/* Footer */}
      <footer className="absolute bottom-7 w-full flex items-center bg-opacity-50 text-black px-4 z-10">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Type your message...."
            className="w-full py-3 px-5 pr-4 rounded-lg border border-[#DD88CF] bg-[#4B164C] text-white"
          />
          <MessageSquare className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
        </div>
        <button className="ml-2" onClick={() => setClicked(true)}>
          <CircleX size={50} className="text-red-600" />
        </button>
        <button
          className="ml-4 p-2 bg-blue-500 rounded-full text-white"
          onClick={() => setClicked(true)}
        >
          <Plus size={24} />
        </button>
      </footer>

      {/* Modal */}
      {clicked && (
        <div className=" absolute top-0 left-0 w-full h-full backdrop-blur-lg flex items-center justify-center">
          <Upgrade />
        </div>
      )}
    </div>
  );
}
