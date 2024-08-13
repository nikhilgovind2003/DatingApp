import { CheckCheck, ChevronLeft  } from 'lucide-react';

const SpinPage = () => {
  return (
    <div className=" relative  bg-deep-plum min-h-screen">

      <div className=' p-2 border-[1px] relative top-[24px] left-[24px] border-gray-400 w-[40px] h-[40px] flex items-center justify-center rounded-full'>
        < ChevronLeft  className=' text-gray-400 mt4'/>
      </div>

      <div className=" flex items-center pt-24 text-primary flex-col justify-center">
        <h1>1 km near you</h1>
        <div className=" mt-6 w-[116px] h-[116px] rounded-full border-4 border-light-purple">
          <img
            className=" object-f w-full h-full rounded-full border-4 border-deep-plum"
            src="https://s3-alpha-sig.figma.com/img/96ff/2cfa/6f229305367cdd87659b045828973252?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VWDRaAeLt6JaCM2zm6sQ5QMnTFTrT5IZvRjKtXMjtrKdus74CwE6TBsroQ5yBJpGVHk2rexqw7Ot7B4G36GgPlNBjPzSkfKyg9DVIc9bDfPSTBH7KVCfaIDqJLsMeg4D8HL3DHUqsGQfNvTGK~~9zm9YpcGPacj5iiMuELgOWgL9lvV~WaKHAnfm00Lt82jF-Gzb4j7PFuYrvnmsFZvKaVQLnNhwOVDOm5ptQJXYbUWVn7DCvSfi3kkK0iMKmJq9iftqHSpgt9CyhOeDJRAg-6X-vVxzmMaf9gmJNYDah8P2j~300XN6Du7uM6gl7NhHd~7wp7gyR5Hreyzz6PRHcw__"
            alt=""
          />
        </div>
      </div>


      <div className=' text-center mt-12 text-primary flex flex-col items-center gap-4'>
        <p>Sona - 27</p>
        <div className=' w-[90px] rounded-full bg-light-purple px-4 flex items-center gap-2'>
          <CheckCheck />
          Like
        </div>
      </div>

      <div className="absolute bottom-0 flex items-end justify-center w-full">
        <svg
          className=""
          width="375"
          height="272"
          viewBox="0 0 375 272"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <path
              d="M301.044 38.2586L299.624 40.1158C267.18 15.4042 228.421 2.33824 187.521 2.33824C124.162 2.33824 65.8715 34.2164 31.5919 87.6162L29.6255 86.3489C64.3202 32.2718 123.354 0.000350952 187.521 0.000350952C228.924 0.000350952 268.185 13.2411 301.044 38.2586Z"
              fill="white"
            />
            <path
              d="M375 187.489C375 290.88 290.885 375 187.5 375C84.115 375 0 290.88 0 187.489H2.33773C2.33773 289.591 85.404 372.64 187.478 372.64C289.574 372.64 372.619 289.569 372.619 187.489C372.619 156.638 364.885 126.092 350.246 99.174L352.3 98.0597C367.179 125.328 375 156.266 375 187.489Z"
              fill="white"
            />
            <path
              d="M356.91 187.487C356.91 206.059 353.917 224.303 348.039 241.739L343.604 240.232C349.328 223.277 352.234 205.535 352.234 187.466C352.234 102.625 288.678 32.1604 204.388 23.6173L204.869 18.9416C291.519 27.7687 356.91 100.221 356.91 187.487Z"
              fill="white"
            />
            <path
              d="M161.195 24.8857C122.983 31.0253 87.9604 50.646 62.5947 80.1645C36.9451 109.989 22.8312 148.116 22.8312 187.488C22.8312 219.279 31.8982 250.13 49.0708 276.721C69.0836 307.703 99.2339 331.344 133.972 343.296L132.443 347.731C96.7214 335.452 65.719 311.134 45.1381 279.277C27.4849 251.922 18.1558 220.197 18.1558 187.51C18.1558 147.002 32.6847 107.804 59.0553 77.1274C85.1419 46.7787 121.169 26.5899 160.474 20.2754L161.195 24.8857Z"
              fill="white"
            />
            <path
              d="M309.85 187.488C309.85 254.959 254.967 309.845 187.5 309.845C160.19 309.845 134.366 301.039 112.824 284.412L115.686 280.698C136.42 296.691 161.239 305.147 187.5 305.147C252.367 305.147 305.152 252.359 305.152 187.488C305.152 175.974 303.492 164.59 300.215 153.688L304.715 152.333C308.145 163.695 309.85 175.537 309.85 187.488Z"
              fill="white"
            />
            <path
              d="M277.732 104.854L274.28 108.022C252.039 83.7478 220.425 69.8298 187.522 69.8298C164.363 69.8298 141.947 76.5594 122.698 89.2758L120.12 85.3647C140.133 72.124 163.445 65.1322 187.543 65.1322C221.736 65.1541 254.617 79.6183 277.732 104.854Z"
              fill="white"
            />
            <path
              d="M95.3882 114.295C78.6744 135.292 69.8478 160.615 69.8478 187.49C69.8478 211.066 76.7955 233.811 89.9481 253.278L86.0591 255.9C72.3822 235.668 65.1724 212.005 65.1724 187.49C65.1724 159.523 74.3486 133.194 91.7396 111.367L95.3882 114.295Z"
              fill="white"
            />
            <path
              d="M288.831 187.488C288.831 203.963 284.79 220.328 277.143 234.792L275.067 233.7C282.539 219.563 286.494 203.591 286.494 187.51C286.494 143.09 256.627 103.849 213.849 92.0721L214.482 89.8217C258.266 101.839 288.831 142.02 288.831 187.488Z"
              fill="white"
            />
            <path
              d="M259.184 259.131C240.045 278.271 214.592 288.824 187.522 288.824C131.657 288.824 86.1909 243.378 86.1909 187.487C86.1909 131.618 131.657 86.1497 187.522 86.1497V88.4876C132.946 88.4876 88.5505 132.886 88.5505 187.465C88.5505 242.045 132.946 286.443 187.522 286.443C213.958 286.443 238.822 276.152 257.523 257.427L259.184 259.131Z"
              fill="white"
            />
            <path
              d="M250.531 187.489C250.531 222.251 222.26 250.524 187.499 250.524C152.739 250.524 124.468 222.251 124.468 187.489H129.165C129.165 219.651 155.339 245.827 187.499 245.827C219.66 245.827 245.834 219.651 245.834 187.489C245.834 155.327 219.66 129.151 187.499 129.151V124.454C222.26 124.476 250.531 152.749 250.531 187.489Z"
              fill="white"
            />
            <path
              d="M218.83 187.487C218.83 204.77 204.782 218.819 187.5 218.819V216.482C203.471 216.482 216.471 203.481 216.471 187.509C216.471 171.537 203.471 158.537 187.5 158.537C171.529 158.537 158.529 171.537 158.529 187.509C158.529 196.38 162.506 204.639 169.454 210.189L167.99 212.024C160.474 206.038 156.17 197.101 156.17 187.509C156.17 170.226 170.218 156.177 187.5 156.177C204.782 156.177 218.83 170.226 218.83 187.487Z"
              fill="white"
            />
          </g>
        </svg>
      </div>

      <div className=" absolute bottom-5 w-full flex items-center justify-center">
        <div className=" relative w-[327px] h-[64px] flex items-end justify-center rounded-full bg-white p-2">
          <div className="curve w-[60px] h-[60px] absolute top-[-25px] border-[10px] border-deep-plum rounded-full">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/Color_circle_%28RGB%29.png"
              alt=""
            />
          </div>
          Spin Here
        </div>
      </div>
    </div>
  );
};

export default SpinPage;
