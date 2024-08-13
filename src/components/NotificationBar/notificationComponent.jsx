import { X } from "lucide-react";
import { useState } from "react";

const notificationComponent = (props) => {

  const [notification, setNotification] = useState(true);
  const onhandleNotification = (not) => {
    setNotification(!not);
  };



  const time = new Date().toLocaleTimeString();
  return (
    <>
      {notification ? (
        <div className=" relative text-primary rounded-2xl w-[100%] bg-deep-plum p-8">
          {props.message === "news" ? (
            <div>
              <h1 className=" text-sm capitalize text-blue-600 font-semibold">
                NEWS
              </h1>

              <h1 className=" mb-4 font-semibold text-xl mt-4">News Title</h1>

              <p className=" text-sm text-gray-400 font-light">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium atque odit reprehenderit ipsum nam voluptatem!
              </p>
            </div>
          ) : (
              <div className=" flex gap-4 items-center">
                <div className={`${props.color} font-bold`}>
                {props.logo}
                </div>
                <h1 className=" mb-4 font-semibold text-xl mt-4">{props.message} Message</h1>
            </div>
          )}

          <div className={props.message==="news"? "absolute top-6 right-6": "absolute top-6 right-6 flex flex-col h-24 justify-center"}>
            <X className=" cursor-pointer" onClick={onhandleNotification} />
          </div>

          <div className={props.message === "news" ? " mt-4 text-gray-400" : "text-gray-400 ml-10"}>
            Today {time}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default notificationComponent;
