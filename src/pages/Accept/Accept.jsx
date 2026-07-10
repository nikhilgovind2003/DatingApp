import { API_URL, SOCKET_URL } from "@/apiConfig";
import React,{ useEffect, useState }  from 'react'
import PageTitle from "../../components/PageTitle/PageTitle";
import { Search } from "lucide-react";
import {UserPreview } from "../../components";
import axios from 'axios';
function Accept() {

  const [acceptrequests, setAcceptRequests] = useState([]);
    const[acceptrequestData,setAcceptRequestData] =useState([]);
  
    useEffect(() => {
      const fetchRequestedLists = async () => {
        try {
          const response = await axios.get(`${API_URL}/users/user`, { withCredentials: true });

          const acceptedRequests = response.data[0].friends;
          setAcceptRequests(acceptedRequests);
  
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchRequestedLists();
    
    }, []);
  
useEffect(()=>{
  const resposeData=async()=>{
    try{
   const users = acceptrequests.map(userId =>
    axios.get(`${API_URL}/users/profile/${userId}`)
   )
   const respostedata = await Promise.all(users)
   const allRequestedData = respostedata.map(data =>data.data)
      setAcceptRequestData(allRequestedData)
    }
    catch (error) {
      console.log(error);
    }
  }
  resposeData();
  console.log(acceptrequests)
},[acceptrequests])


if(acceptrequestData?.length === 0){
  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={Search} pageTitle={"Accept"} />
      <div className="rounded-t-4xl h-screen overflow-y-scroll bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum ">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No users have accepted you yet.</p>
        </div>
      </div>
    </div>  
  )
}

  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={Search} pageTitle={"Accept"} />
      <div className="rounded-t-4xl h-screen overflow-y-scroll bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum">
        {acceptrequestData?.map(user => {
            const name =user?.user?.firstName + " " +user?. user?.lastName;
           return (
            <UserPreview
            key={user?.user._id}
            name={name}
            url={user?.profileImage.url}
            bio={user?.bio}
            phonecall={true}
            video={true}
          />
           )
        })}
      </div>
    </div>
  );
}

export default Accept;



