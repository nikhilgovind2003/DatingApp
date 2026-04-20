import { API_URL } from "@/apiConfig";
import { Bell } from "lucide-react";
import NotificationComponent from "./notificationComponent";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import { useSocket } from "@/context/SocketContext";

const NotificationBar = () => {
  const { socket } = useSocket();
  const userInfo = useSelector(state => state.userAuth.userInfo);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/users/notifications`, { withCredentials: true });
        setNotifications(res.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    if (socket) {
      const handleNewNotification = (notification) => {
        console.log("Real-time notification received in bar:", notification);
        setNotifications((prev) => [notification, ...prev]);
      };

      socket.on('newNotification', handleNewNotification);

      return () => {
        socket.off('newNotification', handleNewNotification);
      };
    }
  }, [socket]);

  return (
    <div className="w-full p-4 backdrop-blur-lg h-full z-10 overflow-y-auto">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-deep-plum">Notifications</h1>
        <div className="border-2 border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors">
          <Link to="/home">
            <Bell size={24} className="text-deep-plum" />
          </Link>
        </div>
      </nav>

      <div className="flex flex-col gap-4 w-full h-[calc(100vh-120px)] overflow-y-auto pb-20">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Bell size={48} className="mb-4 opacity-20" />
            <p className="italic">No new notifications</p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <NotificationComponent 
              key={notification._id || index} 
              notification={notification} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationBar;



