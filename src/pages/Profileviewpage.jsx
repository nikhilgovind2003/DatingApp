import React from 'react';
import { ChevronLeft, Navigation } from 'lucide-react';
import ProfileActionbar from '../components/ProfileActionbar';
import Button from '../components/buttons/InterestButton';


function Profileviewpage() {


const [data, setData] = useState(null);

    const getProfile = async () => {
    const profileDetails = await axios.get(
      `${API_URL}/users/get-profile`,
      {
        withCredentials: true,
      }
    );
    setData(profileDetails.data);
  };

  useEffect(() => {
    getProfile();
  }, []);




  if(data?.length === 0){
    return (
      <div className="bg-deep-plum h-screen overflow-y-auto">
        <PageTitle icon={Search} pageTitle={"Profile"} />
        <div className="rounded-t-4xl h-[600px] overflow-y-scroll bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum ">
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No users have shortlisted you yet.</p>
          </div>
        </div>
      </div>  
    )
  }

  return (
    <div>
      <div className="container relative h-screen overflow-y-auto w-full mx-auto">
      <div
  className="h-[75vh] overflow-hidden sticky top-0 "
  style={{
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(128, 0, 128, 0.7)), url(${data?.profileDetails?.profileImage?.url}) `,
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
      <Navigation /><span>2.5 KM</span>
    </div>
  </div>

  <div className="mt- absolute bottom-24 left-1/2 transform -translate-x-1/2 p-2 flex-wrap justify-center items-center">
    <div className="text-center">
      <span className="text-3xl text-white text-center">Alfredo Calzoni, 20</span> <br />
      <span className="text-sm text-gray-300">HAMBURG, GERMANY</span>
    </div>
    <div className="text-white text-center mt-6">
      <span className="pl-1 pr-4 bg-[#4b164c] py-4 rounded-full" style={{ border: "2px solid violet" }}>
        <span className="p-2 rounded-full mr-2 border-orange-100" style={{ border: "4px solid violet" }}>80%</span>
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
              <p className="font-Roboto font-medium">A good listener. I love having a good talk to know each other’s side 😍.</p>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Interest</span>
              <div className="flex gap-2 flex-wrap">
                {/* Interests */}
                <Button text="Football" icon="⚽" selected={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Actionbar */}
        <div className="fixed z-50 bottom-10 left-1/2 transform -translate-x-1/2">
        <ProfileActionbar 
             userId={currentUserId} 
             from={friendRequestFromId} 
             to={friendRequestToId} 
        />

         </div>
      </div>
    </div>
  );
}

export default Profileviewpage;
