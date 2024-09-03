import React from "react";
import UserIcon from "./UserIcon";
import { Heart, QrCode, X, PhoneCall, Video } from "lucide-react";

const UserPreview = ({ url, name, bio, message, edit, qr, close, fav, phonecall, video, userId }) => {
  
  // Handle the click event for the close button
  const handleCloseClick = () => {
    if (typeof close === 'function') {
      close(userId); // Pass userId to the close function
    }
  };

  return (
    <div className="py-4 flex items-center justify-between px-6 sm:px-2">
      <div className="flex gap-5 items-center">
        <UserIcon url={url} edit={edit} />
        <div>
          <p className="text-text font-semibold text-xl">{name}</p>
          { 
            message 
            ? <p className="text-text-light text-sm">{message}</p> 
            : <p className="text-text-light text-sm">{bio}</p>
          }
        </div>
      </div>
      <div className="flex gap-5">
        {qr && <QrCode className="w-6 h-6 text-[#24786d]" />}
        {fav && <Heart className="w-6 h-6 text-text-light" />}
        {close && <X className="w-6 h-6 text-text-light cursor-pointer" onClick={handleCloseClick} />}
        {phonecall && <PhoneCall className="w-6 h-6 text-text-light" />}
        {video && <Video className="w-6 h-6 text-text-light" />}
      </div>
    </div>
  );
};

export default UserPreview;
