import { ArrowLeft, CircleX, MessageSquare } from "lucide-react";

export default function Story() {
  return (
    <div className="relative flex h-screen bg-cover bg-center w-full lg:w-full  mx-auto" 
      style={{
        backgroundImage: `url('https://neural.love/cdn/ai-photostock/1eee2bb4-39ba-6ac4-8b66-ffe5a5909567/0.jpg?Expires=1727740799&Signature=MXr7E5bEM7G30qmuVC1fJGI8C0i9MRWQ55bZg4HY9AVkJnp9z7UNwNAcBtMc8Zga-FkfjnWKdxP3NbE776q0kY81fxHYdEmsA2x1LnLGV5-ocUK3d-LnhHNU11YcrbxLn3I2vQs~GoZhDlbtxRwvjn~DU88-6zD9hn2pltiyLoJBO13nBd8EWEBNI1rvnUII3K1qOURxPIWbjL2EcviT4D~fLLAyOSHVNNIzbfUNX8ZuKTL~D5chW3xLjYQoVCPDhDEGIssdvSgBXL9c9TTXgTNoHughQGF-HmAnW8KtQuI1rHHnMZh3ABvLudKFiFJ9g94DHO1gL4B2qYuMMh2giQ__&Key-Pair-Id=K2RFTOXRBNSROX')`
      }}>


      <header className="ml-5 items-center w-full md:w-1/3 flex bg-black bg-opacity-0 text-white py-4 fixed top-0 z-10 space-x-2">
          <ArrowLeft />
          <h1 className="text-center text-2xl font-bold">Story Header</h1>
      </header>
      

      <footer className="w-full md:w-1/3 flex items-center mx-auto justify-between bg-black bg-opacity-0 text-black fixed bottom-7 z-10 px-4">
        <div className="relative flex-1 items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full py-3 px-5 pr-4 rounded-lg border border-light-purple focus:outline-none bg-deep-plum"
          />
          <MessageSquare className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
        </div>
        <button className="ml-2">
            <CircleX size={50} className="text-red-600" />
        </button>
      </footer>
    </div>
  );
}
