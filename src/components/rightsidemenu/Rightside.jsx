import React, { useState, useEffect } from 'react';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { CiCircleRemove } from "react-icons/ci";
import { FaCrown } from "react-icons/fa";
import { MdInput } from "react-icons/md";
import UserIcon from '../usericons/UserIcon.JSX';
import { navData } from '../../datas/navData';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie'

const Rightside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [placements, setPlacement] = useState('right');
  
  const userInfo = useSelector((state) => state.userAuth.userInfo);
  console.log(userInfo);

  const myProfileCookie = Cookies.get('myProfile');
  const decodedMyProfileCookie = decodeURIComponent(myProfileCookie);
  const cleanedMyProfileJson = decodedMyProfileCookie.startsWith('j:') ? decodedMyProfileCookie.slice(2) : decodedMyProfileCookie;
  const myProfile = JSON.parse(cleanedMyProfileJson);
  console.log(myProfile);
  

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post('http://localhost:5000/logout', null, { withCredentials: true });
      console.log(res.data.message);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button variant={'none'} className='flex items-center gap-2 ' onClick={toggleDropdown}>
        <UserIcon url={myProfile?.profileImage?.url}/>
      </Button>

      <Drawer placement={placements} isOpen={isOpen} onClose={!isOpen}>
        <DrawerOverlay />
        <DrawerContent className='h-fit'>
          <DrawerBody className="bg-deep-plum bg-opacity-100 backdrop-filter backdrop-blur-lg border border-white border-opacity-10 w-[20rem] rounded-sm">
            
            <CiCircleRemove className='size-7 text-white mb-2 ml-[15rem] mt-2' onClick={toggleDropdown} />
            <div className="flex flex-row items-center ml-3">
              <div className="relative border-[3px] border-light-purple rounded-full">
                <img
                  src={myProfile?.profileImage?.url || "https://images.pexels.com/photos/13704184/pexels-photo-13704184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} // Replace with user's profile picture URL
                  alt="Profile"
                  className="rounded-full w-12 h-12 object-cover"
                />
                <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-hot-purple"></span>
              </div>
              <div className="text-center mt-3 ml-3">
                <h2 className="font-bold text-lg text-light-purple">{userInfo?.firstName + " " + userInfo?.lastName || "User Name"}</h2>
                <p className="text-sm text-yellow-300">
                  <div className='flex flex-row '>
                    <FaCrown className='m-[.2rem]'/>
                    {userInfo?.membershipStatus || "Prime Member"}
                  </div>
                </p>
                <p className="text-sm text-green-600 text-center ml-2">Online</p>
              </div>
            </div>
            <div className='overflow-y-auto py-5' style={{ height: '450px' }}>
              <ul className='space-y-2 text-white'>
                {navData?.map(item => (
                  <Link to={item.href} key={item.title}>
                    <li className="hover:bg-dark-wine px-4 py-2">
                      {item.title}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className='flex flex-row ml-7 mb-4'>
              <Button variant={'none'} onClick={handleLogout}>
                <MdInput className='size-5 text-white -rotate-180 ...'/>
                <h3 className='text-white ml-4'>Logout</h3>
              </Button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Rightside;
