import { IoMdThumbsUp } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";
import { TbDots } from "react-icons/tb";
import { Heart, Star, Check, X } from "lucide-react";
import { useState } from "react";
const HomeCardComponents = (props) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      {props.isActive && (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            backgroundImage: `url("${props.img}")`,
          }}
          className="w-full h-[120px] rounded-2xl bg-cover object-contain relative"
        >
          <div className="bg-gray-500 bg-opacity-[20%] text-white backdrop-blur-lg top-2 left-4 absolute text-[10px] px-2 rounded-full">
            <p>Online</p>
          </div>
          <div className="flex flex-col justify-center w-full absolute bottom-[5%] text-primary text-shadow-xl text-[12px] px-4">
            <div className="flex justify-between items-center">
              <p className="">{props.name}</p>
              <p className="text-[7px] tracking-[0.25em]">
                {props.gender}
                {props.age}YRS
              </p>
            </div>
            <p className="text-[7px] tracking-[0.25em]">
              {props.job}, {props.place}
            </p>
          </div>

          <div
            className={
              hover
                ? "absolute top-[18%] shadow-xl bg-gray-500 bg-opacity-[40%] h-[70px] flex flex-col justify-around right-0 text-white rounded-tl-lg rounded-bl-lg outline outline-transparent p-[5px] border-[1px] border-gray-100 ease-in-out duration-300"
                : "fixed left-[-100%]"
            }
          >
            <button className="bg-[#FFFFFF] bg-opacity-[20%] p-1 w-[18.4px] h-[14px] flex items-center justify-center rounded-full">
              <Heart size={10} />
            </button>
            <button className="bg-[#FFFFFF] bg-opacity-[20%] p-1 w-[18.4px] h-[14px] flex items-center justify-center rounded-full">
              <Star size={10} />
            </button>

            <button className="bg-[#FFFFFF] bg-opacity-[20%] p-1 w-[18.4px] h-[14px] flex items-center justify-center rounded-full">
              <X size={10} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeCardComponents;
