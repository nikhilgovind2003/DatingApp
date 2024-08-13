import { ArrowLeft, ScanLine } from "lucide-react";
import { useState } from "react";

const AddCreditCard = () => {
  const [Data, setData] = useState({
    name: "",
    creditCardNumber: "",
    express: "",
    cvv: "",
  });

  const onHandleSubmit = (e) => {
    e.preventDefault();
  };

  const onHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };


  console.log(Data);
  
  return (
    <div className=" h-screen md:shadow-lg lg:mx-auto font-poppins bg-white w-full lg:p-4 p-4 overflow-y-auto ">
      <ArrowLeft size={30} />

      <h1 className="text-[34px] font-semibold text-deep-plum md:my-4">
        AddCreditCard
      </h1>

      <form action="" onSubmit={onHandleSubmit} className="">
        {/* name */}
        <div className="flex flex-col justify-center mt-4">
          <label required htmlFor="name" className=" font-[500] text-sm">
            Name
          </label>
          <input
            name="name"
            required
            onChange={onHandleChange}
            value={Data.value}
            type="text"
            className="border-b-2 outline-none border-black font-[500] mt-2 text-lg"
          />
        </div>

        <div className=" flex flex-col justify-center mt-4">
          <label required htmlFor="name" className=" font-[500] text-sm">
            Credit card number
          </label>
          <input
            type="number"
            required
            name="creditCardNumber"
            onChange={onHandleChange}
            value={Data.value}
            className="border-b-2 outline-none border-black font-[500] mt-2 text-lg"
          />
        </div>

        <button className=" w-[154px] bg-deep-plum rounded-xl flex items-center gap-2 py-4 justify-center text-primary  mt-4">
          <ScanLine />
          Scan Card
        </button>

        <div className=" grid grid-cols-2 gap-8">
          {/* Express */}
          <div className=" flex flex-col justify-center mt-4">
            <label required htmlFor="name" className=" font-[500] text-sm">
              Express
            </label>
            <input
              required
              name="express"
              onChange={onHandleChange}
              value={Data.value}
              type="date"
              className="border-b-2 outline-none border-black font-[500] mt-2 text-lg"
            />
          </div>

          {/* CVV */}
          <div className="flex flex-col justify-center mt-4">
            <label required htmlFor="name" className=" font-[500] text-sm">
              CVV
            </label>
            <input
              name="cvv"
              required
              onChange={onHandleChange}
              value={Data.value}
              type="password"
              id=""
              maxLength={3}
              className="border-b-2 outline-none border-black font-[500] mt-2 text-lg"
            />
          </div>
        </div>

        <p className=" my-12 text-xs md:text-xs">
          Debit cards are accepted at some locations and for some categories.
        </p>

        <div className="grid my-4 grid-cols-5 gap-8">
          <img
            className=" w-[100px]"
            src="https://s3-alpha-sig.figma.com/img/7cc7/fb73/be76a9732b8a8afd82ac533d17a268f7?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K14ZErSVWTHwuQUQj2WCY000Hq4McTLdeREbWvn7RGqY-Z5eeij9cfFVRG9mWDp-KKgSxSWQalVSddV9P6b4ySrB08fX~ktQ2w67TIk6bKpbuKvwErBjMq4cF4pkPEro76ZgootHVdxqHi~v0b22y7hRqJ8aN5UDiZIoxc8SjYZFS--EHhAxyKcHS9alHpdPmlSx3m21bblQCEzaIOdWhUKyWLg7X3RZkoFO3fzoaKLyoeLbRbZhoSvQD6Dbl3m2JDUEGTuFF1jx7rXOZoG7tbKUeer-sYVGyailxkPEjVV6ZGS73nIwBFzb7R5BK~AcFe6LC6SJ83BQg13odPPAHw__"
            alt="visa"
          />
          <img
            className=" w-[100px]"
            src="https://s3-alpha-sig.figma.com/img/500f/bc7e/c870361fa74336787a3dc2461002770f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Fa1ddYQ9Cy6GS-syxP8yx8xatmWrkWH~4hyLWCNgkpp1BnpijtLxwIdjgTzlHnOo8yQD15ZKrIpxFXpIqkjkLeNY7gpED4nybcrOL~JMQa0L-gmoze3WwS7ErJfeh-bBjFOpCQaNjC2DAbi4Hku8N4a6ecMQj7ZO4QZngE1sExMtKQ2wzJX0ikRVdDvNl5NSHfxOsGrMMYMN9TJx7znGcXTHkM2GBo6ZrucYiDFH3ZBEwfjDpOyuePpX58WcelxTfJcakW2tbAil5qxLUzCv3MqFn9CWhydbTDbFuYuKWfU8Kr-M6PkQql-XRZMySTbr1H3QbQE8ihIK-kU0mdF9EQ__"
            alt=""
          />
          <img
            className=" w-[100px]"
            src="https://s3-alpha-sig.figma.com/img/4965/c2c9/2ccdb79d3156a044eefe05adad46663e?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A-526~~KDEXl9psF3lgOQvKWbuBjCtwWdfcWFPUH66kuGWO3U~3LLjdFultAhMVK~o6WhRKesIkdIb~7sOyvbkmGmtbyIiKNcRRr3Em2Yv8p9Jbhm~Dc1UR0BfPX8DLjoE9YQ2HULPHqxqdcvbpT59lT5RwIPGa8ST0lc2lTfzdgBAdAUpea4YjG1QVO5ZD~SQ3G~4BV~3q3DIlcSUWK7YH8eAJhLXHeopnIO1lHz50N7LgXGII~2XyP~x1GL5krZyJeZakK0u5qjfbo3SVl3CVkHaYYfl65KNKw9lSiZu~n9Es5Ft3LHg4wz4ptz62taQc9evOxBoHzc4jcsSvvRw__"
            alt=""
          />
          <img
            className=" w-[100px]"
            src="https://s3-alpha-sig.figma.com/img/0c4e/38a7/8a884faaf0415ae67e43beea39c15874?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X08KK-XPtLmhS40h5Qk7UqLxt~Tup3UD~zzviwfFGmlYBzpui8qSgZmtkOI7l2Qt~JYD~LI6kF~5T-ZcUNATvTcX4cZhS7Xe~-O0BACwmzS35x1q3Y7iHUagYP3YtWTDviz2PWuuhN7wovO6unBwy2~aN7zIj7GZsybliR-~Q-QJmDSkXeA1-iW4zlWGFE4Q~Zytj8jJGjh96HTsPzTp6JpsP17xa2i9kcUFcDQ7mkU7LRWhKYyivmytkGaawLnuk7alLi-SoKomf~k65IZ7z2ZYlaMvlXv9poS~EFKyjaf3V4dSuJfnJk6iS~dtnFyxNZz8dTkiRCPDRy2dmrmHfw__"
            alt=""
          />
        </div>

        <div className="flex items-center justify-center mt-4">
          <input
            type="submit"
            value="ADD PAYMENT METHOD"
            className=" sm:p-4 bg-deep-plum p-4 w-full lg:text-lg md:w-full text-2xl mx-4 py-4 rounded-xl text-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default AddCreditCard;
