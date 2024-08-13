import React from "react";

const PaymentMethods = () => {
  return (
    <div
      className="bg-white p-6 h-screen  mx-auto rounded-lg "
     
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        <button aria-label="Close" className="text-base sm:text-lg font-bold">
          ✕
        </button>
        <button className="text-sm sm:text-md font-semibold text-gray-700">Done</button>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold font-poppins text-purple-900 text-center sm:text-center">
        Payment methods
      </h1>
      <p className="text-gray-600   break-words line-clamp-2 mb-6 mt-3">
        Choose your preferred payment type. We offer easy ways for payments on our app.
      </p>

      {/* Payment Methods List */}
      <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
        <div className="border border-red-500 rounded-lg p-2 sm:p-3 flex items-center space-x-2 sm:space-x-3">
          <img src="/IMAGES/images-removebg-preview (33) 1.png" alt="MasterCard" className="w-12 h-10 sm:ms-7" />
          <div className="flex-1">
            <p className="font-semibold  sm:ms-7">************4444</p>
            <p className="text-gray-500 text-xs md:text-md sm:ms-7">Expires 09/25</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 flex items-center space-x-2 sm:space-x-3" >
  <img src="/IMAGES/images-removebg-preview (33) 2.png" alt="Visa" className="sm:w-8 opacity-100 shadow-xs w-16 h-8 sm:ms-8" />
  <div className="flex-1">
    <p className="font-semibold  sm:ms-10">************3343</p>
    <p className="text-gray-500 text-xs sm:ms-10">Expires 09/25</p>
  </div>
</div>
        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 flex items-center space-x-2 sm:space-x-3">
          <img src="/IMAGES/images-removebg-preview (33) 3.png" alt="PayPal" className="w-6 sm:w-8 w-12 h-10 sm:ms-7" />
          <div className="flex-1">
            <p className="font-semibold text-xs sm:text-sm sm:ms-11">Petra-stark@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Current Method */}
      <div className="mt-4 sm:mt-6">
        <p className="text-gray-700 font-semibold ">CURRENT METHOD</p>
        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 flex items-center space-x-2 sm:space-x-3 mt-1">
        <div className="relative w-6 sm:w-8 bg-cover bg-center  sm:ms-7">
  <img src="/IMAGES/images-removebg-preview (33) 4.png" alt="Background" className="w-full" />
  <img src="/IMAGES/fffff-removebg-preview 1.png" alt="Cash Payment" className="absolute inset-0 m-auto w-3/5 sm:w-4/5" />
</div>
          <div className="flex-1">
            <p className="font-semibold  sm:ms-11">Cash payment</p>
            <p className="text-gray-500 text-xs sm:ms-11">Default method</p>
          </div>
          

        </div>
      </div>

      {/* Add Payment Method Button */}
      <button className="text-white w- py-4 px-4 mt-4  rounded-lg font-semibold w-full " style={{backgroundColor:"#4b164c"}}>
  ADD PAYMENT METHOD
</button>


    </div>
  );
};

export default PaymentMethods;
