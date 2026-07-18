import { ArrowLeft, Mic, Paperclip, Send, Smile, Square } from "lucide-react";
import { MdCall } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import EmojiPicker from "emoji-picker-react";
import { API_URL } from "@/apiConfig";
import { useSocket } from "@/context/SocketContext";
import { useSelector } from "react-redux";

export default function Chat(){


  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverData, setReceiverData] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { id: receiverId } = useParams();
  const { socket, isOnline } = useSocket();
  const { userInfo } = useSelector(state => state.userAuth);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
        setReceiverData(userRes?.data);

        // Mark messages as read
        await axios.patch(`${API_URL}/messages/read/${receiverId}`, {}, { withCredentials: true });
        // Clear the notification bell badge for this sender too
        axios.patch(`${API_URL}/notifications/read-by-sender/${receiverId}`, {}, { withCredentials: true })
          .catch((error) => console.error("Error marking notifications as read:", error));

        // Fetch messages
        const res = await axios.get(`${API_URL}/messages/${receiverId}`, { withCredentials: true });
        const formattedMessages = res?.data?.map(msg => ({
          text: msg.message,
          attachment: msg.attachment,
          messageType: msg.messageType,
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
            attachment: data.attachment,
            messageType: data.messageType,
            time: new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sent: false
          }
        ]);
        // Mark as read immediately since this chat is already open
        axios.patch(`${API_URL}/messages/read/${receiverId}`, {}, { withCredentials: true })
          .catch((error) => console.error("Error marking message as read:", error));
        axios.patch(`${API_URL}/notifications/read-by-sender/${receiverId}`, {}, { withCredentials: true })
          .catch((error) => console.error("Error marking notifications as read:", error));
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, receiverId]);

  const sendMessage = async (attachmentFile = null, messageType = "text") => {
    const messageToSend = value;
    if (!messageToSend.trim() && !attachmentFile) return;

    setValue("");
    setShowEmojiPicker(false);

    // Optimistic update
    const optimisticMessage = {
      text: messageToSend,
      attachment: attachmentFile ? { url: URL.createObjectURL(attachmentFile) } : null,
      messageType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true
    };
    setMessages(prev => [...prev, optimisticMessage]);

    try {
      if (attachmentFile) {
        const formData = new FormData();
        formData.append("message", messageToSend);
        formData.append("attachment", attachmentFile);
        await axios.post(
          `${API_URL}/messages/send/${receiverId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
        );
      } else {
        await axios.post(
          `${API_URL}/messages/send/${receiverId}`,
          { message: messageToSend },
          { withCredentials: true }
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    sendMessage(file, "image");
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        if (audioBlob.size > 0) {
          const audioFile = new File([audioBlob], `voice-${Date.now()}.webm`, { type: "audio/webm" });
          sendMessage(audioFile, "audio");
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Microphone permission is required to record voice messages");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };




  return (
    <div className="relative bg-deep-plum h-screen flex flex-col">
      <div className="flex items-center px-4 py-3 bg-deep-plum text-white">
          <ArrowLeft className="cursor-pointer mr-4" onClick={() => navigate(-1)} />
          <div className="flex-1 flex items-center gap-3">
              <div className="relative">
                  {receiverData?.profile?.profileImage?.url ? (
                      <img 
                        src={receiverData?.profile?.profileImage?.url} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                      />
                  ) : (
                      <div className="w-10 h-10 bg-light-purple rounded-full flex items-center justify-center font-bold text-white uppercase">
                          {receiverData?.firstName?.[0] || 'U'}
                      </div>
                  )}
                  {online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-deep-plum rounded-full"></span>
                  )}
              </div>
              <div>
                  <h3 className="font-bold leading-tight">
                    {receiverData ? `${receiverData.firstName} ${receiverData.lastName}` : 'Loading...'}
                  </h3>
                  <p className="text-xs opacity-80">{online ? 'Online' : 'Offline'}</p>
              </div>
          </div>
          <Link to={`tel:${receiverData?.contact}`}>
          <MdCall size={24} className="cursor-pointer" />
          </Link>
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
                {msg.messageType === "image" && msg.attachment?.url ? (
                  <img src={msg.attachment.url} alt="attachment" className="max-w-[200px] rounded-lg mb-1" />
                ) : msg.messageType === "audio" && msg.attachment?.url ? (
                  <audio controls src={msg.attachment.url} className="max-w-[220px]" />
                ) : (
                  <p>{msg.text}</p>
                )}
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
      <div className="fixed bottom-[110px] md:bottom-6 left-0 right-0 absolute px-4 max-w-2xl mx-auto">
        {showEmojiPicker && (
          <div className="absolute bottom-full mb-2 right-4">
            <EmojiPicker onEmojiClick={(emojiData) => setValue(v => v + emojiData.emoji)} />
          </div>
        )}
        {isRecording && (
          <div className="absolute bottom-full mb-2 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
            Recording... release to send
          </div>
        )}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 shadow-lg">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Paperclip
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            size={20}
          />
          <Smile
            onClick={() => setShowEmojiPicker(prev => !prev)}
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            size={20}
          />
          <input
            type="text"
            className="flex-1 bg-transparent outline-none py-2 text-sm text-gray-700"
            placeholder="Type a message..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <div className="flex items-center gap-3">
            {isRecording ? (
              <Square
                onClick={stopRecording}
                className="text-red-500 cursor-pointer"
                size={20}
              />
            ) : (
              <Mic
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onMouseLeave={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                className="text-blue-500 cursor-pointer select-none"
                size={20}
              />
            )}
            <button
              onClick={() => sendMessage()}
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