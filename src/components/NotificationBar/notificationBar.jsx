import { AlertCircle, Bell, CircleX, CircleCheckBig } from "lucide-react";
import NotificationComponent from "./notificationComponent";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../apiConfig";



const notificationBar = (prop) => {
  const socket = prop.socket
  const userInfo = useSelector(state => state.userAuth.userInfo)
  console.log(`Inside Notification ${userInfo?._id}`)
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {

    // axios.get(`http://localhost:5000/api/v1/users/notifications`,{ withCredentials: true })
    // .then((res) => res.json())
    // .then((data) => setNotifications(data));

    axios.get(`${API_URL}/users/notifications`, { withCredentials: true })
      .then((res) => {
        console.log(`Fetched Notifications::${res.data} `)
        setNotifications(res.data);  // Access the parsed JSON directly using res.data
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });

    console.log(userInfo?._id)
    // Join room specific to the user
    // socket.emit('joinRoom', userInfo?._id);  // Replace with your user ID logic

    // Listen for real-time notifications
    socket.on('newNotification', (notification) => {
      console.log("Received New Notification.. pushing to state...")
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off('newNotification');
    };
  }, []);

  return (
    <div className=" w-full p-4 backdrop-blur-lg h-full z-10">
      <nav className="absolute right-14 lg:right-24 border-2 border-gray-300 rounded-full p-2 mb-4">
        <Link to="/home">
          <Bell />
        </Link>
      </nav>

      <div className="flex flex-col items-center gap-4 justify-center w-full mt-16">
        {notifications.map((notification) => (
          <NotificationComponent key={socket.id} notification={notification} />
        ))}

        {/* <NotificationComponent
          message="news" logo={<></>}
          />
        <NotificationComponent
          message="Successfully" color={"text-green-500"} logo={<CircleCheckBig />}
          />
        
        <NotificationComponent
          message="Alert" color={"text-yellow-500"} logo={<AlertCircle />}
          />
        
        <NotificationComponent
          message="Error" color={"text-red-500"} logo={<CircleX/>}
          /> */}


      </div>
    </div>
  );
};

export default notificationBar;
