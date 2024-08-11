import React ,  { useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerContent,DrawerOverlay, } from "@chakra-ui/react";
import { CiCircleRemove } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";

function Sidemenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState('left');

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <div>
      <>
        <Button className='bg-origin-padding w-min h-64 bg-transparent text-white text-xl font-bold mb-4' onClick={onOpen}>
          <CiMenuBurger className='right-5 space-x-3 border-s-dark-wine' /><span><h3>Buddy pair</h3></span>
        </Button>

        <Drawer placement={placement} isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent className='bg-opacity-5'>
            <DrawerBody className='bg-deep-plum'>
              
              <CiCircleRemove   className='size-7  '  onClick={onClose} /><br />
                <br />
                <ul>
                  <li className="text-white text-lg py-2 hover:bg-purple-500 px-2 rounded 	text-decoration-line: underline "> Dating</li><br />
                  <li className="text-white text-lg py-2 hover:bg-purple-500 px-2 rounded text-decoration-line: underline">Matrimony</li><br />
                  <li className="text-white text-lg py-2 hover:bg-purple-500 px-2 rounded text-decoration-line: underline">E commerce</li><br />
                  <li className="text-white text-lg py-2 hover:bg-purple-500 px-2 rounded text-decoration-line: underline">Study Abroad</li><br />
                  <li className="text-white text-lg py-2 hover:bg-purple-500 px-2 rounded text-decoration-line: underline">Job Portal</li><br />
                </ul>
            
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </div>
  );
}

export default Sidemenu;
