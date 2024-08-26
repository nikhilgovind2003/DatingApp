import { IoMdThumbsUp } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";
import { TbDots } from "react-icons/tb";

const HomeCardComponents = (props) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url("${props.img}")`
        }}
        className="w-full h-[120.03px] rounded-2xl bg-cover bg-left relative"
      >
        <div className="bg-[#FFFFFF] bg-opacity-[20%] text-white top-2 left-4 absolute text-[10px] px-[2px] rounded-full">
          <p>Online</p>
        </div>
        <div className="flex flex-col justify-center w-full absolute bottom-[5%] text-white text-[12px] px-4">
          <div className="flex justify-between items-center">
            <p>{props.name}</p>
            <p className="text-[7px] tracking-[0.25em]">
              {props.sex}{props.age}YRS
            </p>
          </div>
          <p className="text-[7px] tracking-[0.25em]">
            {props.job}, {props.place}
          </p>
        </div>

        <div className="absolute top-[20%] bg-primary bg-opacity-[40%] right-0 text-white rounded-tl-lg rounded-bl-lg outline outline-transparent p-[5px] border-[1px] border-gray-100">
          <div className="bg-[#FFFFFF] bg-opacity-[20%] p-1 w-[18.4px] h-[14px] flex items-center justify-center rounded-full">
            <IoMdThumbsUp size={10} />
          </div>
          <div className="bg-[#FFFFFF] bg-opacity-[20%] p-1 w-[18.4px] h-[14px] flex items-center justify-center rounded-full my-1">
            <BiSolidMessageRounded size={10} />
          </div>
          <div className="bg-[#FFFFFF] bg-opacity-[20%] p-1 w-[18.4px] h-[14px] flex items-center justify-center rounded-full">
            <TbDots size={10} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCardComponents;
