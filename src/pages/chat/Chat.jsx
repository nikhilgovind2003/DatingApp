import { ArrowLeft, Mic, Paperclip } from "lucide-react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { MdCall } from "react-icons/md";
const Chat = () => {
  return (
    <div className="relative bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={ArrowLeft} pageTitle={"Name"} />
      <div className="h-9 w-9 absolute right-10 bg-light-purple top-14 flex justify-center items-center rounded-full text-white border-2 border-white">
        <MdCall size={20} />
      </div>

      {/* white bg */}
      <div className=" pb-24 overflow-y-auto rounded-t-4xl bg-white w-full px-0 md:pb-5 sm:border-2 h-full border-deep-plum ">
        <button className=" bg-blue-100 border-[2px] border-gray-300 border-t-0 mx-auto px-6 py-1 translate-x-[-50%] font-semibold rounded-b-md ml-[50%]">
          Today
        </button>

        {/* messages */}
        <div className="bg-deep-plum relative opacity-60 text-primary font-semibold p-4 rounded-r-xl mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-2 text-xs mt-4 lg:text-sm">10:30</p>
        </div>
        <div className="bg-blue-200 relative bg-opacity-60 text-black font-bold p-4 rounded-l-xl ml-[100px] lg:ml-[190px] mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-4 text-xs mt-4 lg:text-sm">10:40</p>
        </div>
        <div className="bg-deep-plum relative opacity-60 text-primary font-semibold p-4 rounded-r-xl mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-2 text-xs mt-4 lg:text-sm">10:30</p>
        </div>
        <div className="bg-blue-200 relative bg-opacity-60 text-black font-bold p-4 rounded-l-xl ml-[100px] lg:ml-[190px] mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-4 text-xs mt-4 lg:text-sm">10:40</p>
        </div>
        <div className="bg-deep-plum relative opacity-60 text-primary font-semibold p-4 rounded-r-xl mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-2 text-xs mt-4 lg:text-sm">10:30</p>
        </div>
        <div className="bg-blue-200 relative bg-opacity-60 text-black font-bold p-4 rounded-l-xl ml-[100px] lg:ml-[190px] mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-4 text-xs mt-4 lg:text-sm">10:40</p>
        </div>
        <div className="bg-deep-plum relative opacity-60 text-primary font-semibold p-4 rounded-r-xl mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-2 text-xs mt-4 lg:text-sm">10:30</p>
        </div>
        <div className="bg-blue-200 relative bg-opacity-60 text-black font-bold p-4 rounded-l-xl ml-[100px] lg:ml-[190px] mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-4 text-xs mt-4 lg:text-sm">10:40</p>
        </div>
        <div className="bg-deep-plum relative opacity-60 text-primary font-semibold p-4 rounded-r-xl mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-2 text-xs mt-4 lg:text-sm">10:30</p>
        </div>
        <div className="bg-blue-200 relative bg-opacity-60 text-black font-bold p-4 rounded-l-xl ml-[100px] lg:ml-[190px] mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-4 text-xs mt-4 lg:text-sm">10:40</p>
        </div>
        <div className="bg-deep-plum relative opacity-60 text-primary font-semibold p-4 rounded-r-xl mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-2 text-xs mt-4 lg:text-sm">10:30</p>
        </div>
        <div className="bg-blue-200 relative bg-opacity-60 text-black font-bold p-4 rounded-l-xl ml-[100px] lg:ml-[190px] mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-4 text-xs mt-4 lg:text-sm">10:40</p>
        </div>
        <div className="bg-deep-plum relative opacity-60 text-primary font-semibold p-4 rounded-r-xl mt-4 w-3/4">
          <p className=" mb-4">Hi Nicholas, Good Evening</p>
          <p className=" absolute bottom-2 right-2 text-xs mt-4 lg:text-sm">10:30</p>
        </div>

      </div>
        <div className=" lg:w-[700px] fixed flex items-center justify-between rounded-full bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-50 border-[2px] border-blue-100 text-center px-2">
          <input
            type="text"
            name="message"
            placeholder="Message..."
            className="w-full bg-blue-50 outline-none h-10"
          />
          <Paperclip />
          <div className="ml-2 bg-blue-500 p-1 rounded-full">
            <Mic />
          </div>
        </div>
    </div>
  );
};

export default Chat;
