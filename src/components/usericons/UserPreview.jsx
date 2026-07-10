import PropTypes from "prop-types";
import UserIcon from "./UserIcon";
import { Heart, QrCode, X, PhoneCall, Video } from "lucide-react";
import { useSocket } from "@/context/SocketContext";
import { Link } from "react-router-dom";

const UserPreview = ({
  url,
  name,
  bio,
  message,
  edit,
  qr,
  close,
  fav,
  phonecall,
  video,
  userId,
  unreadCount,
  onFav,
  onClose,
}) => {
  // Handle the click event for the close button
  const handleCloseClick = () => {
    if (onClose) {
      onClose(userId);
    } else if (typeof close === "function") {
      close(userId); // Backward compatibility
    }
  };

  // Handle the click event for the fav button
  const handleFavClick = () => {
    if (onFav) {
      onFav(userId);
    } else if (typeof fav === "function") {
      fav(userId);
    }
  };

  const { isOnline } = useSocket();

  const online = isOnline(userId);


  return (
    <div className="py-4 flex items-center justify-between px-6 sm:px-2 hover:bg-dark-wine rounded-xl transition-all ease-in-out duration-200">
      <Link to={`/profile/${userId}`} className="flex gap-5 items-center">
        <div className="relative">
          <UserIcon url={url} edit={edit} />
          {online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full z-1 bg-green-500 border-2 border-white animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className="text-text font-semibold text-md lg:text-xl">{name}</p>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {unreadCount}
              </span>
            )}
          </div>
          {message ? (
            <p className="text-text-light text-sm line-clamp-1">{message}</p>
          ) : (
            <p className="text-text-light text-sm">{bio}</p>
          )}
        </div>
      </Link>

      <div className="flex gap-5">
        {qr && <QrCode className="w-4 h-4 text-[#24786d]" />}
        {fav && (
          <Heart
            className={`w-4 h-4 text-red-500 ${onFav || typeof fav === "function" ? "cursor-pointer" : ""}`}
            onClick={handleFavClick}
          />
        )}
        {close && (
          <X
            className={`w-4 h-4 text-text-light ${onClose || typeof close === "function" ? "cursor-pointer" : ""}`}
            onClick={handleCloseClick}
          />
        )}
        {phonecall && <PhoneCall className="w-4 h-4 text-text-light" />}
        {video && <Video className="w-4 h-4 text-text-light" />}
      </div>
    </div>
  );
};

UserPreview.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  bio: PropTypes.string,
  message: PropTypes.string,
  edit: PropTypes.bool,
  qr: PropTypes.bool,
  close: PropTypes.bool,
  fav: PropTypes.bool,
  phonecall: PropTypes.bool,
  video: PropTypes.bool,
  userId: PropTypes.string,
  unreadCount: PropTypes.number,
  onFav: PropTypes.func,
  onClose: PropTypes.func,
};

export default UserPreview;
