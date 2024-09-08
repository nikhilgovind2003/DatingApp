import { ArrowLeft, Mic, Paperclip, Send } from "lucide-react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { MdCall } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");



const Chat = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [send, setSend] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = async () => {
    try {
      // Emit message to server via socket
      socket.emit("send_message", { value });

      // Call the API to send the message (if applicable)
      // const res = await axios.post(
      //   `http://localhost:5000/api/v1/users/messages/send`
      // );
      // setSend(res.data);
    } catch (error) {
      console.log(error.messages);
    }

    if (value.trim()) {
      // Add the new message to the messages list (with "sent" status)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: value, time: new Date().toLocaleTimeString(), sent: true },
      ]);

      // Clear the input field
      setValue("");
      console.log("Message sent:", value);
    }
  };

  useEffect(() => {
    // Listen for incoming messages
    socket.on("recieve_message", (data) => {
      setMessageReceived(data.value);

      // Add the received message to the messages list (with "received" status)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.value, time: new Date().toLocaleTimeString(), sent: false },
      ]);
    });

    // Cleanup listener when component unmounts
    return () => {
      socket.off("recieve_message");
    };
  }, [socket]);

  return (
    <div className="relative bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={ArrowLeft} pageTitle={"Name"} />
      <div className="h-9 w-9 absolute right-10 bg-light-purple top-14 flex justify-center items-center rounded-full text-white border-2 border-white">
        <MdCall size={20} />
      </div>

      {/* Chat Messages */}
      <div
        className="overflow-y-auto rounded-t-4xl bg-white w-full px-0 md:pb-5 sm:border-2 h-full border-deep-plum"
        style={{ paddingBottom: "100px" }}
      >
        <button className="bg-blue-100 border-[2px] border-gray-300 border-t-0 mx-auto px-6 py-1 translate-x-[-50%] font-semibold rounded-b-md ml-[50%]">
          Today
        </button>

        {/* Display messages dynamically */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`relative p-4 rounded-xl mt-4 w-3/4 ${
              msg.sent
                ? "bg-deep-plum bg-opacity-60 text-black font-bold ml-[100px] lg:ml-[190px] rounded-l-xl"
                : "bg-green-200 text-white font-bold mr-[100px] lg:mr-[190px] rounded-r-xl"
            }`}
          >
            <p className="mb-4">{msg.text}</p>
            <p className="absolute bottom-2 right-4 text-xs mt-4 lg:text-sm">
              {msg.time}
            </p>
          </div>
        ))}

        {/* Added space at the bottom */}
        <div className="h-24"></div>
      </div>

      {/* Input Field */}
      <div className="w-[350px] lg:w-[700px] fixed flex items-center justify-between rounded-full bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-50 border-[2px] border-blue-100 text-center px-2">
        <input
          type="text"
          name="message"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Message..."
          className="w-full bg-blue-50 outline-none h-10"
        />
        <Paperclip />
        <div className="ml-2 bg-blue-500 p-1 mx-4 rounded-full">
          <Mic />
        </div>
        <div className="cursor-pointer" onClick={sendMessage}>
          <Send />
        </div>
      </div>
    </div>
  );
};

export default Chat;
