import { API_URL, SOCKET_URL } from "@/apiConfig";
import React,{useEffect,useState} from 'react';
import {UserPreview} from '../components';
import PageTitle from '../components/PageTitle/PageTitle';
import { Search } from 'lucide-react';
import axios from 'axios';
const RejectPage = () => {

  const [rejectrequests, setRejectedRequests] = useState([]);
  const[requestrejectedData,setRejectRequestData] =useState([]);

  useEffect(() => {
    const fetchRequestedLists = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/user`, { withCredentials: true });

        const rejectedRequests = response.data[0].rejected;
        setRejectedRequests(rejectedRequests);

      } catch (error) {
        console.log(error);
      }
    };

    fetchRequestedLists();
  
  }, []);

useEffect(()=>{
const resposeData=async()=>{
  try{
 const users = rejectrequests.map(userId =>
  axios.get(`${API_URL}/users/profile/${userId}`)
 )
 const respostedata = await Promise.all(users)
 const allRequestedData = respostedata.map(data =>data.data)
    setRejectRequestData(allRequestedData)
  }
  catch (error) {
    console.log(error);
  }
}
resposeData();
console.log(rejectrequests)
},[rejectrequests])

  // Group users by the first letter of their first name
  const groupedUsers = requestrejectedData.reduce((acc, user) => {
    const firstLetter = user.user.firstName.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});



  if(requestrejectedData?.length === 0){
    return (
      <div className="bg-deep-plum h-screen overflow-y-auto">
        <PageTitle icon={Search} pageTitle={"Reject"} />
        <div className="rounded-t-4xl h-screen overflow-y-scroll bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum ">
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No users have rejected you yet.</p>
          </div>
        </div>
      </div>  
    )
  }

  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={Search} pageTitle={"Reject"} />
      <div className="rounded-t-4xl h-screen overflow-y-scroll bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum">
        {Object.keys(groupedUsers).sort().map(letter => (
          <div key={letter}>
            <h1 className="text-xl font-semibold mt-6 ms-10 sm:ms-7">{letter}</h1>
            {groupedUsers[letter].map(user => {
              const name = `${user.user.firstName} ${user.user.lastName}`;
              return (
                <UserPreview
                  key={user.user.id}
                  name={name}
                  url={user.profileImage.url}
                  bio={user.bio}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RejectPage;



