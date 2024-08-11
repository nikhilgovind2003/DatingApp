import { ArrowLeft, CircleX, MessageSquare, Pencil } from "lucide-react";
import { useState } from "react";
import UserIcon from "../components/UserIcon"; // Adjust the path according to your project structure


export default function Story() {
  const [clicked, setClicked] = useState(false);

  const handleClose = () => {
    setClicked(false);
  };

  return (
    <div
      className="relative flex h-screen bg-cover bg-center w-full md:w-1/3 mx-auto"
      style={{
        backgroundImage: `url('https://neural.love/cdn/ai-photostock/1eee2bb4-39ba-6ac4-8b66-ffe5a5909567/0.jpg?Expires=1727740799&Signature=MXr7E5bEM7G30qmuVC1fJGI8C0i9MRWQ55bZg4HY9AVkJnp9z7UNwNAcBtMc8Zga-FkfjnWKdxP3NbE776q0kY81fxHYdEmsA2x1LnLGV5-ocUK3d-LnhHNU11YcrbxLn3I2vQs~GoZhDlbtxRwvjn~DU88-6zD9hn2pltiyLoJBO13nBd8EWEBNI1rvnUII3K1qOURxPIWbjL2EcviT4D~fLLAyOSHVNNIzbfUNX8ZuKTL~D5chW3xLjYQoVCPDhDEGIssdvSgBXL9c9TTXgTNoHughQGF-HmAnW8KtQuI1rHHnMZh3ABvLudKFiFJ9g94DHO1gL4B2qYuMMh2giQ__&Key-Pair-Id=K2RFTOXRBNSROX')`,
      }}
    >
      {/* Header */}
      <header
        onClick={() => setClicked(true)}
        className="ml-5 items-center w-full md:w-1/3 flex bg-black bg-opacity-0 text-white py-4 fixed top-0 z-10 space-x-2 cursor-pointer"
      >
        <ArrowLeft />
        <UserIcon
          url="https://images.pexels.com/photos/13704184/pexels-photo-13704184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          story={true}
        />
      </header>

      {/* Footer */}
      <footer className="w-full md:w-1/3 flex items-center justify-between bg-black bg-opacity-0 text-black fixed bottom-7 z-10 px-4">
        <div className="relative flex-1 items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full py-3 px-5 pr-4 rounded-lg border border-[#DD88CF] focus:outline-none bg-[#4B164C]"
          />
          <MessageSquare className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
        </div>
        <button className="ml-2">
          <CircleX size={50} className="text-red-600" />
        </button>
      </footer>

      {/* Modal */}
      {clicked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
          <div className="bg-white px-8 rounded-3xl shadow-lg text-center pt-12 pb-4">
            <h2 className="font-montserrat text-2xl font-medium mb-4">
              Upgrade to
              <br />
              View Profile
            </h2>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-deep-plum text-white rounded-4xl hover:shadow-lg w-full"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
