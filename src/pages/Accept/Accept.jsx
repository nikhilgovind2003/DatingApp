import React,{ useEffect, useState }  from 'react'
import PageTitle from "../../components/PageTitle/PageTitle";
import { Search } from "lucide-react";
import { Userdata } from "../../datas/Userdata";
import { UserPreview } from "../../components";
import axios from 'axios';
function Accept() {

  const [requests, setRequests] = useState([]);
    const[requestData,setRequestData] =useState([]);
  
    useEffect(() => {
      const fetchRequestedLists = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/v1/users/user', { withCredentials: true });

          const acceptedRequests = response.data[0].friends;
          setRequests(acceptedRequests);
  
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchRequestedLists();
    
    }, []);
  
useEffect(()=>{
  const resposeData=async()=>{
    try{
   const users = requests.map(userId =>
    axios.get(`http://localhost:5000/api/v1/users/profile/${userId}`)
   )
   const respostedata = await Promise.all(users)
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


  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={Search} pageTitle={"Accept"} />
      <div className="rounded-t-4xl h-[600px] overflow-y-scroll bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum">
        {requestData?.map(user => {
            const name =user.user.firstName + " " +user. user.lastName;
           return (
            <UserPreview
            key={user.user._id}
            name={name}
            url={user.profileImage.url}
            bio={user.bio}
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
