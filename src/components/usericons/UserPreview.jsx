import React from "react";
import UserIcon from "./UserIcon";
import { Heart, QrCode, X, PhoneCall, Video } from "lucide-react";

const UserPreview = ({ url, name, bio, message, edit, qr, close, fav, phonecall, video, userId, unreadCount, onFav, onClose }) => {
  
  // Handle the click event for the close button
  const handleCloseClick = () => {
    if (onClose) {
      onClose(userId);
    } else if (typeof close === 'function') {
      close(userId); // Backward compatibility
    }
  };

  // Handle the click event for the fav button
  const handleFavClick = () => {
    if (onFav) {
      onFav(userId);
    } else if (typeof fav === 'function') {
      fav(userId);
    }
  };

  return (
    <div className="py-4 flex items-center justify-between px-6 sm:px-2">
      <div className="flex gap-5 items-center">
        <UserIcon url={url} edit={edit} />
        <div>
          <div className="flex items-center gap-2">
            <p className="text-text font-semibold text-xl">{name}</p>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {unreadCount}
              </span>
            )}
          </div>
          { 
            message 
            ? <p className="text-text-light text-sm line-clamp-1">{message}</p> 
            : <p className="text-text-light text-sm">{bio}</p>
          }
        </div>
      </div>
      <div className="flex gap-5">
        {qr && <QrCode className="w-6 h-6 text-[#24786d]" />}
        {fav && (
          <Heart 
            className={`w-6 h-6 text-red-500 ${(onFav || typeof fav === 'function') ? 'cursor-pointer' : ''}`} 
            onClick={handleFavClick}
          />
        )}
        {close && (
          <X 
            className={`w-6 h-6 text-text-light ${(onClose || typeof close === 'function') ? 'cursor-pointer' : ''}`} 
            onClick={handleCloseClick} 
          />
        )}
        {phonecall && <PhoneCall className="w-6 h-6 text-text-light" />}
        {video && <Video className="w-6 h-6 text-text-light" />}
      </div>
    </div>
  );
};

export default UserPreview;
