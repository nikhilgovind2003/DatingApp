import React,{ useEffect, useState }  from 'react'
import { UserContactedPreview } from '../components';
import PageTitle from '../components/PageTitle/PageTitle';
import { Search } from 'lucide-react';
import axios from 'axios';
const ContactedPage = () => {

    const [requests, setRequests] = useState([]);
    const[requestData,setRequestData] =useState([]);
  
    useEffect(() => {
      const fetchRequestedLists = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/v1/users/user', { withCredentials: true });

          const friendRequests = response.data[0].friendRequests;
           // get pending requestonly
          const pendingRequests = friendRequests.filter(request => request.status === 'pending');
          // Extract the 'from' fields from the friendRequests array
          const fromArray = pendingRequests.map(request => request.from)
          setRequests(fromArray);
  
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchRequestedLists();
    
    }, []); // No need to include 'requests' as a dependency
  
useEffect(()=>{
  const resposeData=async()=>{
    try{
   const profiles = requests.map(from =>
    axios.get(`http://localhost:5000/api/v1/users/profile/${from}`)
   )
   const respostedata = await Promise.all(profiles)
   const allRequestedData = respostedata.map(data =>data.data)
      setRequestData(allRequestedData)
    }
    catch (error) {
      console.log(error);
    }
  }
  resposeData();
  console.log(requestData)
},[requests])

const handleAcceptRequest = async (userId) => {
  
  try {
    
    await axios.patch(`http://localhost:5000/api/v1/users/accept/${userId}`,{}, { withCredentials: true });
   
  } catch (error) {
    console.log('failed to accept request:', error);
  }
};
const handleRejectRequest = async (userId) => {
  
  try {
    
    await axios.patch(`http://localhost:5000/api/v1/users/reject/${userId}`,{}, { withCredentials: true });
   
  } catch (error) {
    console.log('failed to accept request:', error);
  }
};




  // Group users by the first letter of their first name
  const groupedUsers = requestData.reduce((acc, user) => {
    const firstLetter = user.user.firstName.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={Search} pageTitle={"Contacted"} />
      <div className="rounded-t-4xl h-[600px] overflow-y-scroll bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum">
        {Object.keys(groupedUsers).sort().map(letter => (
          <div key={letter}>
            <h1 className="text-xl font-semibold mt-6 ms-10 sm:ms-7">{letter}</h1>
            {groupedUsers[letter].map(user => {
              const name = `${user.user.firstName} ${user.user.lastName}`;
              return (
                <UserContactedPreview
                key={user.user._id}
                userId={user.user._id}
                name={name}
                url={user.profileImage.url}
                bio={user.bio}
                fav={handleAcceptRequest}
                close={handleRejectRequest}
              
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactedPage;
