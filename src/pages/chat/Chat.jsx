import { ArrowLeft, Mic, Paperclip, Send } from "lucide-react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { MdCall } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "@/apiConfig";
import { useSocket } from "@/context/SocketContext";
import { useSelector } from "react-redux";

const Chat = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverData, setReceiverData] = useState(null);
  const { id: receiverId } = useParams();
  const { socket, isOnline } = useSocket();
  const { userInfo } = useSelector(state => state.userAuth);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const online = isOnline(receiverId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch receiver details and messages
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setLoading(true);
        // Fetch receiver's basic profile for the header
        const userRes = await axios.get(`${API_URL}/users/profile/${receiverId}`, { withCredentials: true });
        setReceiverData(userRes.data);

        // Mark messages as read
        await axios.patch(`${API_URL}/messages/read/${receiverId}`, {}, { withCredentials: true });

        // Fetch messages
        const res = await axios.get(`${API_URL}/messages/${receiverId}`, { withCredentials: true });
        const formattedMessages = res.data.map(msg => ({
          text: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sent: msg.senderId === userInfo?._id
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo?._id && receiverId) {
      fetchChatData();
    }
  }, [receiverId, userInfo?._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for real-time messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      // Only add message if it's from the person we're currently chatting with
      if (data.senderId === receiverId) {
        setMessages((prev) => [
          ...prev,
          {
            text: data.message,
            time: new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sent: false
          }
        ]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, receiverId]);

  const sendMessage = async () => {
    if (!value.trim()) return;

    const messageToSend = value;
    setValue("");

    try {
      // Optimistic update
      const newMessage = {
        text: messageToSend,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sent: true
      };
      setMessages(prev => [...prev, newMessage]);

      // Call the API to save and broadcast
      await axios.post(
        `${API_URL}/messages/send/${receiverId}`,
        { message: messageToSend },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="relative bg-deep-plum h-screen flex flex-col">
      <div className="flex items-center px-4 py-3 bg-deep-plum text-white">
          <ArrowLeft className="cursor-pointer mr-4" onClick={() => navigate(-1)} />
          <div className="flex-1 flex items-center gap-3">
              <div className="relative">
                  {receiverData?.profileImage?.url ? (
                      <img 
                        src={receiverData.profileImage.url} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                      />
                  ) : (
                      <div className="w-10 h-10 bg-light-purple rounded-full flex items-center justify-center font-bold text-white uppercase">
                          {receiverData?.user?.firstName?.[0] || 'U'}
                      </div>
                  )}
                  {online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-deep-plum rounded-full"></span>
                  )}
              </div>
              <div>
                  <h3 className="font-bold leading-tight">
                    {receiverData?.user ? `${receiverData.user.firstName} ${receiverData.user.lastName}` : 'Loading...'}
                  </h3>
                  <p className="text-xs opacity-80">{online ? 'Online' : 'Offline'}</p>
              </div>
          </div>
          <MdCall size={24} className="cursor-pointer" />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-white rounded-t-[40px] px-4 pt-6 pb-24">
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-400 italic">
            Loading conversation...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-400 italic">
            No messages yet. Say hi!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${msg.sent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-2xl shadow-sm text-sm font-medium ${
                  msg.sent
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right opacity-70`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="fixed bottom-6 left-0 right-0 px-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 shadow-lg">
          <Paperclip className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" size={20} />
          <input
            type="text"
            className="flex-1 bg-transparent outline-none py-2 text-sm text-gray-700"
            placeholder="Type a message..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <div className="flex items-center gap-3">
            <Mic className="text-blue-500 cursor-pointer" size={20} />
            <button 
              onClick={sendMessage}
              disabled={!value.trim()}
              className={`p-2 rounded-full transition-all ${
                value.trim() ? "bg-blue-500 text-white shadow-md scale-105" : "bg-gray-200 text-gray-400"
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;


