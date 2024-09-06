import React,{useEffect,useState} from 'react';
import { Userdata } from '../datas/Userdata';
import { UserPreview } from '../components';
import PageTitle from '../components/PageTitle/PageTitle';
import { Search } from 'lucide-react';
import axios from 'axios';
const RejectPage = () => {

  const [requests, setRequests] = useState([]);
  const[requestData,setRequestData] =useState([]);

  useEffect(() => {
    const fetchRequestedLists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/users/user', { withCredentials: true });

        const acceptedRequests = response.data[0].rejected;
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
      <PageTitle icon={Search} pageTitle={"Reject"} />
      <div className="rounded-t-4xl h-[600px] overflow-y-scroll bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum">
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
