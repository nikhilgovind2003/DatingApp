import { API_URL, SOCKET_URL } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle/PageTitle";
import { ChevronLeft } from "lucide-react";
import { UserPreview } from "../components";
import { LiaHeartSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSocket } from "@/context/SocketContext";

export default function Messages() {
  const [chats, setChats] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const { socket } = useSocket();

  const fetchChats = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages/list`, { withCredentials: true });
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const fetchMatches = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/users`, { withCredentials: true });
      setRecentMatches(response.data.slice(0, 10)); // Just show some as "matches" for now
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    fetchChats();
    fetchMatches();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", () => {
      fetchChats(); // Refresh list on new message
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={ChevronLeft} pageTitle={"Messages"} />

      {/* Recent Matches Section */}
      <div className="px-10">
        <h2 className="font-Play text-lg font-medium text-white mb-4">
          Recent Matches
        </h2>
        <div className="flex overflow-x-auto space-x-5 pb-4 scrollbar-hide">
          {recentMatches.map((match) => (
            <div key={match._id} className="flex-shrink-0 relative">
              <img
                src={match.profileImage?.url || "https://via.placeholder.com/150"}
                alt={match.user?.firstName || "User"}
                className="h-24 w-20 rounded-2xl object-cover border-2 border-deep-plum shadow-lg"
              />
              <div className="absolute inset-0 bg-light-purple bg-opacity-30 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <LiaHeartSolid color="#ffffff" size={24} />
              </div>
              <p className="text-white text-[10px] text-center mt-1 truncate w-20">
                {match.user?.firstName}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Section */}
      <div className="rounded-t-[40px] bg-white pt-8 px-5 pb-24 md:pb-5 min-h-[500px]">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 italic">
            <p>No active conversations yet.</p>
            <p className="text-sm">Start a chat from a profile!</p>
          </div>
        ) : (
          chats.map((chat) => (
            <Link key={chat.conversationId} to={`/chat/${chat.otherUser._id}`}>
              <UserPreview 
                name={chat.otherUser.name} 
                url={chat.otherUser.profileImage} 
                message={chat.lastMessage}
                unreadCount={chat.unreadCount}
                bio={new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}



