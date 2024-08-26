

// import { useEffect } from "react";
// import { Userdata } from "../datas/Userdata";
// import { ButtonGroup, Sidemenu, UserIcon } from "../Components";
// import { HiOutlineBell } from "react-icons/hi";
// import HomeCardComponents from "../components/Homecards/HomeCardComponents";
// import { Link } from "react-router-dom";
// import Rightside from "../components/rightsidemenu/Rightside";
// import axios from "axios";

// const HomePage = () => {
//   useEffect(() => {
//     userByLocation();
//   }, []);

//   const userByLocation = () => {
//     try {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           fetchByLocation(latitude, longitude);
//         });
//       } else {
//         alert("Your browser is not supporting geolocation");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchByLocation = async (latitude, longitude) => {
//     await axios
//       .post("http://localhost:5000/location", { latitude, longitude })
//       .then((res) => {
//         console.log(res.da);
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <section className="lg:w-full md:w-full sm: w-screen pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto overflow-x-hidden">
//       <div className="flex justify-between md:hidden gap-5">
//         <Sidemenu />
//         <div className="flex gap-3">
//           <button className="relative p-2 flex items-center rounded-full border-2 w-16 h-16">
//             <Link to="/notification">
//               <HiOutlineBell className="w-9 h-9 text-text ms-1" />
//             </Link>
//             <div className=" bg-light-purple border border-primary absolute top-[16.5px] right-[19.5px] rounded-full w-[8px] h-[8px]"></div>
//           </button>
//           <div className="pt-3">
//             <Rightside />
//           </div>
//         </div>
//       </div>
//       <div className="flex  justify-between items-center gap-5 overflow-x-auto  lg:w-full sm: w-screen ">
//         <button>
//           <UserIcon add={"purple"} />
//           <p className="mt-0.5 text-[14px]">My Story</p>
//         </button>
//         {Userdata?.map((user, i) => (
//           <button key={i}>
//             <UserIcon key={user.id} story={true} url={user.img} />
//             <p className="mt-0.5 text-[14px]">{user.firstName}</p>
//           </button>
//         ))}
//       </div>
//       <ButtonGroup />
//       <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5">
//         {Userdata.map((user, i) => {
//           const name = user.firstName + " " + user.lastName;
//           return (
//             <HomeCardComponents
//               key={i}
//               img={user.img}
//               name={user.name}
//               sex={user.gender}
//               age={user.age}
//               job={user.job}
//               place={user.place}
//             />
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default HomePage;

// import { useEffect, useState } from "react";
// import { ButtonGroup, Sidemenu, UserIcon } from "../Components";
// import { HiOutlineBell } from "react-icons/hi";
// import HomeCardComponents from "../components/Homecards/HomeCardComponents";
// import { Link } from "react-router-dom";
// import Rightside from "../components/rightsidemenu/Rightside";
// import axios from "axios";

// const HomePage = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     userByLocation();
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/v1/users/users"
//       ); // Fetch all users from your backend
//       setUsers(response.data); // Store fetched users in the state
//     } catch (error) {
//       console.log("Error fetching users:", error);
//     }
//   };

//   const userByLocation = () => {
//     try {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           fetchByLocation(latitude, longitude);
//         });
//       } else {
//         alert("Your browser does not support geolocation");
//       }
//     } catch (error) {
//       console.log("Error getting location:", error);
//     }
//   };

//   const fetchByLocation = async (latitude, longitude) => {
//     try {
//       const res = await axios.post("http://localhost:5000/location", {
//         latitude,
//         longitude,
//       });
//       console.log("Location data:", res.data);
//     } catch (error) {
//       console.log("Error fetching by location:", error);
//     }
//   };

//   return (
//     <section className="lg:w-full md:w-full sm:w-screen pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto overflow-x-hidden">
//       <div className="flex justify-between md:hidden gap-5">
//         <Sidemenu />
//         <div className="flex gap-3">
//           <button className="relative p-2 flex items-center rounded-full border-2 w-16 h-16">
//             <Link to="/notification">
//               <HiOutlineBell className="w-9 h-9 text-text ms-1" />
//             </Link>
//             <div className=" bg-light-purple border border-primary absolute top-[16.5px] right-[19.5px] rounded-full w-[8px] h-[8px]"></div>
//           </button>
//           <div className="pt-3">
//             <Rightside />
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-between items-center gap-5 overflow-x-auto lg:w-full sm:w-screen">
//         <button>
//           <UserIcon add={"purple"} />
//           <p className="mt-0.5 text-[14px]">My Story</p>
//         </button>
//         {users?.map((user, i) => (
//           <button key={i}>
//             <UserIcon key={user._id} story={true} url={user.img} />
//             <p className="mt-0.5 text-[14px]">{user.firstName}</p>
//           </button>
//         ))}
//       </div>
//       <ButtonGroup />
//       <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5">
//         {users.map((user, i) => {
//           const name = `${user.firstName} ${user.lastName}`;
//           return (
//             <HomeCardComponents
//               key={i}
//               img={user.img}
//               name={name}
//               sex={user.gender}
//               age={user.age}
//               job={user.job}
//               place={user.place}
//             />
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default HomePage;

// import { useEffect, useState } from "react";
// import { Userdata } from "../datas/Userdata";
// import { ButtonGroup, Sidemenu, UserIcon } from "../Components";
// import { HiOutlineBell } from "react-icons/hi";
// import HomeCardComponents from "../components/Homecards/HomeCardComponents";
// import { Link } from "react-router-dom";
// import Rightside from "../components/rightsidemenu/Rightside";
// import axios from "axios";

// const HomePage = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     userByLocation();
//     fetchUsers();
//   }, []);

//   console.log("kolllaaaaaaaaaaaaaaaaaaaaaaaaaaaaaam", users);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/v1/users/users"
//       ); // Fetch all users from your backend
//       setUsers(response.data);
//       console.log("vawwwwwwwwwwwwwww", response);
//     } catch (error) {
//       console.log("thettiyooooooooooooooooooooooooo", error);
//     }
//   };

//   const userByLocation = () => {
//     try {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           fetchByLocation(latitude, longitude);
//         });
//       } else {
//         alert("Your browser is not supporting geolocation");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchByLocation = async (latitude, longitude) => {
//     await axios
//       .post("http://localhost:5000/location", { latitude, longitude })
//       .then((res) => {
//         console.log(res.da);
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <section className="lg:w-full md:w-full sm: w-screen pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto overflow-x-hidden">
//       <div className="flex justify-between md:hidden gap-5">
//         <Sidemenu />
//         <div className="flex gap-3">
//           <button className="relative p-2 flex items-center rounded-full border-2 w-16 h-16">
//             <Link to="/notification">
//               <HiOutlineBell className="w-9 h-9 text-text ms-1" />
//             </Link>
//             <div className=" bg-light-purple border border-primary absolute top-[16.5px] right-[19.5px] rounded-full w-[8px] h-[8px]"></div>
//           </button>
//           <div className="pt-3">
//             <Rightside />
//           </div>
//         </div>
//       </div>
//       <div className="flex  justify-between items-center gap-5 overflow-x-auto  lg:w-full sm: w-screen ">
//         <button>
//           <UserIcon add={"purple"} />
//           <p className="mt-0.5 text-[14px]">My Story</p>
//         </button>
//         {Userdata?.map((user, i) => (
//           <button key={i}>
//             <UserIcon key={user.id} story={true} url={user.img} />
//             <p className="mt-0.5 text-[14px]">{user.firstName}</p>
//           </button>
//         ))}
//       </div>
//       <ButtonGroup />
//       <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5">
//         {Userdata.map((user, i) => {
//           const name = user.firstName + " " + user.lastName;
//           return (
//             <HomeCardComponents
//               key={i}
//               img={user.img}
//               name={user.name}
//               sex={user.gender}
//               age={user.age}
//               job={user.job}
//               place={user.place}
//             />
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default HomePage;

import { useEffect, useState } from "react";
import { ButtonGroup, Sidemenu, UserIcon } from "../Components";
import { HiOutlineBell } from "react-icons/hi";
import HomeCardComponents from "../components/Homecards/HomeCardComponents";
import { Link } from "react-router-dom";
import Rightside from "../components/rightsidemenu/Rightside";
import axios from "axios";

const HomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userByLocation();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/users/users"
      ); // Fetch all users from your backend
      setUsers(response.data); // Store fetched users in state
      console.log("Fetched Data:", response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const userByLocation = () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchByLocation(latitude, longitude);
        });
      } else {
        alert("Your browser does not support geolocation");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchByLocation = async (latitude, longitude) => {
    try {
      const response = await axios.post("http://localhost:5000/location", {
        latitude,
        longitude,
      });
      console.log("Location Data:", response.data);
    } catch (error) {
      console.log("Error fetching by location:", error);
    }
  };

  return (
    <section className="lg:w-full md:w-full sm:w-screen pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto overflow-x-hidden">
      <div className="flex justify-between md:hidden gap-5">
        <Sidemenu />
        <div className="flex gap-3">
          <button className="relative p-2 flex items-center rounded-full border-2 w-16 h-16">
            <Link to="/notification">
              <HiOutlineBell className="w-9 h-9 text-text ms-1" />
            </Link>
            <div className="bg-light-purple border border-primary absolute top-[16.5px] right-[19.5px] rounded-full w-[8px] h-[8px]"></div>
          </button>
          <div className="pt-3">
            <Rightside />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-5 overflow-x-auto lg:w-full sm:w-screen">
        <button>
          <UserIcon add={"purple"} />
          <p className="mt-0.5 text-[14px]">My Story</p>
        </button>
        {users.map((user, i) => (
          <button key={i}>
            <UserIcon story={true} url={user.profileImage.url} />
            <p className="mt-0.5 text-[14px]">{user.firstName}</p>
          </button>
        ))}
      </div>
      <ButtonGroup />
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5">
        {users.map((user, i) => {
          return (
            <HomeCardComponents
              key={i}
              img={user.profileImage.url} // Correctly accessing the image URL
              name={`${user.user?.firstName} ${user.user?.lastName}`}
              sex={user.gender}
              job={user.qualification}
              isActive={user.user?.isActive}
              // place={user.location || "Unknown"} // Assuming `location` is a field; update accordingly
            />
          );
        })}
      </div>
    </section>
  );
};

export default HomePage;
