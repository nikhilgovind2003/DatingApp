import { MessageSquare, Heart, Star, Clock } from "lucide-react";

const NotificationComponent = ({ notification }) => {
  if (!notification) return null;

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(date).toLocaleDateString();
  };

  const getNotificationContent = () => {
    switch (notification.type) {
      case "friend_request":
        return {
          title: "Friend Request",
          message: `Received a friend request from ${notification.sender?.firstName || 'User'}`,
          icon: <Heart className="text-red-400" size={20} />,
          bgColor: "bg-red-50"
        };
      case "shortlist":
        return {
          title: "Profile Shortlisted",
          message: `You were shortlisted by ${notification.sender?.firstName || 'User'}`,
          icon: <Star className="text-yellow-400" size={20} />,
          bgColor: "bg-yellow-50"
        };
      case "message":
        return {
          title: "New Message",
          message: `You have a new message from ${notification.sender?.firstName || 'User'}`,
          icon: <MessageSquare className="text-blue-400" size={20} />,
          bgColor: "bg-blue-50"
        };
      default:
        return {
          title: "Notification",
          message: "You have a new update",
          icon: <Clock className="text-gray-400" size={20} />,
          bgColor: "bg-gray-50"
        };
    }
  };

  const content = getNotificationContent();

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4 items-start group">
      <div className={`p-3 rounded-xl ${content.bgColor} flex-shrink-0 transition-transform group-hover:scale-110`}>
        {content.icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-deep-plum text-sm">{content.title}</h4>
          <span className="text-[10px] text-gray-400 flex items-center gap-1 font-medium">
            <Clock size={10} />
            {getTimeAgo(notification.createdAt)}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          {content.message}
        </p>
      </div>
    </div>
  );
};

export default NotificationComponent;

