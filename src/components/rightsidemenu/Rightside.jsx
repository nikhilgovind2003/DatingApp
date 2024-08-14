import React ,  { useState,useEffect} from 'react';
import { Button, Drawer, DrawerBody, DrawerContent,DrawerOverlay, } from "@chakra-ui/react";
import { CiCircleRemove } from "react-icons/ci";
import { FaCrown } from "react-icons/fa";
import { MdInput } from "react-icons/md";
import UserIcon from '../usericons/UserIcon.JSX';
import { navData } from '../../datas/navData';
import { Link } from 'react-router-dom';



const Rightside = () => {
   
        const [isOpen, setIsOpen] = useState(false);
  const [placements, setPlacement] = useState('right');
// Function to toggle the dropdown open/close state
const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    // Function to handle window resize events
    const handleResize = () => {
      // If the window width is greater than 740px, close the dropdown
      if (window.innerWidth > 800) {
        setIsOpen(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove the event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    <div>
        <Button variant={'none'} className='flex items-center gap-2 ' onClick={toggleDropdown}>
       
        <UserIcon/>
        </Button>

        <Drawer placement={placements} isOpen={isOpen} onClose={!isOpen} >
          <DrawerOverlay />
          <DrawerContent className='h-fit'>
            <DrawerBody className="bg-deep-plum bg-opacity-100 backdrop-filter backdrop-blur-lg border border-white border-opacity-10 w-[20rem]   rounded-sm ">
              
              <CiCircleRemove   className='size-7 text-white mb-2 ml-[15rem] mt-2  '  onClick={toggleDropdown} />
              <div className="flex flex-row items-center  ml-3 ">
        <div className="relative border-[3px] border-light-purple rounded-full ">
          {/* Profile Picture */}
          <img
            src="https://images.pexels.com/photos/13704184/pexels-photo-13704184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with the actual profile picture URL
            alt="Profile"
            className="rounded-full w-12 h-12 object-cover "
          />
          {/* Online Indicator */}
          <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-hot-purple"></span>
        </div>
        <div className="text-center mt-3 ml-3">
          <h2 className="font-bold text-lg text-light-purple">Stone Stellar</h2>
          <p className="text-sm text-yellow-300"><div className='flex flex-row '><FaCrown className='m-[.2rem]'/>Prime Member</div></p>
          <p className="text-sm text-green-600 text-left ml-2">Online</p>
        </div>
      </div>
              <div className=' overflow-y-auto py-5' style={{height:'450px' }}>
        <ul className='space-y-2 text-white'>
          {navData?.map(item => (
            <Link to={item.href} key={item.title}>
            <li className="hover:bg-dark-wine  px-4 py-2">
            {item.title}
            </li>
            </Link>
          ))}
        </ul>
      </div>
                <div className='flex flex-row  ml-7 mb-4'>
                  <Button variant={'none'}>
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