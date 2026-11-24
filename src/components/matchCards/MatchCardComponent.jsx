import { useState, useEffect } from "react";

const MatchCardComponent = (props) => {
  const [isNew, setIsNew] = useState(props.isNew);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay for loading effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as necessary for testing
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div
          className="relative w-[180px] h-[230px] rounded-3xl bg-gray-300 animate-pulse"
        ></div>
      ) : (
        <div
          style={{
            backgroundImage: isNew
              ? `linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.4) 100%), url(${props.img})`
              : `linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.9) 100%), url(${props.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={
            isNew
              ? "relative w-[180px] h-[230px] bg-cover bg-center rounded-3xl"
              : "relative w-[100%] h-[300px] bg-cover bg-center rounded-3xl border-[7px] border-light-purple"
          }
        >
          <div
            className={
              isNew
                ? ""
                : "bg-light-purple rounded-b-3xl text-center text-white pb-2 pt-0 mt-[-5px] w-[75%] mx-auto"
            }
          >
            {isNew ? "" : `${props.match}% Match`}
          </div>

          <div className="absolute text-white bottom-[8%] text-center w-full">
            <div className="bg-primary w-[50%] mx-auto bg-opacity-[40%] backdrop-blur-md border-gray-400 border-2 text-sm py-1 my-1 font-semibold rounded-full">
              <p>{props.distance}km away</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xl font-semibold">
                {props.name}, {props.age}
              </p>
              <div className="bg-green-500 rounded-full w-[7px] h-[7px]"></div>
            </div>
            <p className="font-semibol tracking-widest text-gray-300 text-sm mt-2">
              {props.place}
            </p>
          </div>
          {isNew ? (
            <div className="absolute border-2 border-light-purple rounded-xl top-4 left-4 px-4 py-0 bg-deep-plum p-2 text-white">
              <p>NEW</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default MatchCardComponent;
