import { API_URL } from "@/apiConfig";
import { Bell, Home } from "lucide-react";
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
        const res = await axios.get(`${API_URL}/users/notifications`, { withCredentials: true });
        console.log("notifications", res.data)
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

  const handleReadOne = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };


  console.log("notifications", notifications)

  return (
    <div className="w-full p-4 backdrop-blur-lg h-full z-10 overflow-y-auto">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-deep-plum">Notifications</h1>
        <div className="flex items-center gap-3">
          {notifications.length > 0 && (
            <button 
              onClick={async () => {
                try {
                  await axios.patch(`${API_URL}/notifications/read-all`, {}, { withCredentials: true });
                  setNotifications([]);
                } catch (error) {
                  console.error('Error marking all as read:', error);
                }
              }}
              className="text-xs font-semibold text-deep-plum hover:underline bg-deep-plum/5 px-3 py-1.5 rounded-full transition-all"
            >
              Mark all as read
            </button>
          )}
          <div className="border-2 border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors">
            <Link to="/home">
              <Home size={24} className="text-deep-plum" />
            </Link>
          </div>
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
              onRead={handleReadOne}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationBar;



