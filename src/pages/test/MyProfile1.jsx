import React, { useState } from 'react';
import { ChevronLeft, Navigation } from 'lucide-react';
import ProfileActionbar from '../../components/ProfileActionbar';
import Button from '../../components/buttons/InterestButton';
import { Userdata } from '../../datas/Userdata';
import { useParams } from 'react-router-dom';





function Profileviewpage() {

    const {userId}=useParams();

    const [sinUser] = useState(Userdata.find((user) => user.id === userId));

    
    console.log({sinUser});


  return (
    <div>
      <div className="container relative h-screen overflow-y-auto w-full mx-auto">
      <div
  className="h-[75vh] overflow-hidden sticky top-0 "
  style={{
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(128, 0, 128, 0.7)), url({${sinUser.img}}) `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // backgroundAttachment: 'fixed',
  }}
>
  <div className="topnavigation flex p-2 sticky top-6 justify-between">
    <div className="rounded-full backdrop-filter backdrop-blur-sm bg-opacity-45 border-2 w-fit border-white p-2 text-white">
      <ChevronLeft />
    </div>
    <div className="rounded-full flex border-2 w-fit backdrop-filter backdrop-blur-sm bg-opacity-45 border-white p-2 text-white">
      <Navigation /><span>{sinUser.distance}</span>
    </div>
  </div>

  <div className="mt- absolute bottom-24 left-1/2 transform -translate-x-1/2 p-2 flex-wrap justify-center items-center">
    <div className="text-center">
      <span className="text-3xl text-white text-center">{sinUser.firstName+" "+lastName}</span> <br />
      <span className="text-sm text-gray-300">{sinUser.place}</span>
    </div>
    <div className="text-white text-center mt-6">
      <span className="pl-1 pr-4 bg-[#4b164c] py-4 rounded-full" style={{ border: "2px solid violet" }}>
        <span className="p-2 rounded-full mr-2 border-orange-100" style={{ border: "4px solid violet" }}>{sinUser.match}</span>
        Match
      </span>
    </div>
  </div>
</div>


        {/* Profile Details Section */}
        <div className="profiledetails  cursor-pointer h-full shadow-md p-4 bg-white rounded-t-3xl relative" style={{ marginTop: '-50px', zIndex: '50' }}>
          <div className="bg-gray-400 rounded-full mx-auto" style={{ width: '60px', padding: '2px' }}>
            {/* Avatar or Profile Picture */}
          </div>
          <div className="overflow-y-auto pb-8">
            <div>
              <span className="text-gray-600">About</span>
              <p className="font-Roboto font-medium">{sinUser.bio}</p>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Interest</span>
              <div className="flex gap-2 flex-wrap">
                {/* Interests */}
                <Button text={`${sinUser.interests}`} selected={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Actionbar */}
        <div className="fixed z-50 bottom-10 left-1/2 transform -translate-x-1/2">
          <ProfileActionbar />
        </div>
      </div>
    </div>
  );
}

export default Profileviewpage;
