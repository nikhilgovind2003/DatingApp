import React ,  { useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerContent,DrawerOverlay, } from "@chakra-ui/react";
import { CiCircleRemove } from "react-icons/ci";
import { AlignJustify } from 'lucide-react';

function Sidemenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState('left');

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <div>
        <Button variant={'none'} className='  md:text-white text-text text-xl font-bold mb-4 flex items-center gap-2 pt-5' onClick={onOpen}>
          <AlignJustify className='right-5 space-x-3 border-s-dark-wine w-6 h-6' /><span className='font-medium md:text-white text-text text-2xl'>BuddyPair</span>
        </Button>

        <Drawer placement={placement} isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent className='h-fit'>
            <DrawerBody className="bg-deep-plum   border border-white border-opacity-10 w-[20rem]   p-4">
              
              <CiCircleRemove   className='size-7 text-white mb-2  '  onClick={onClose} />
                <ul className='grid items-center'>
                  <li className="text-white cursor-pointer text-lg py-4 hover:bg-purple-500 hover:bg-opacity-20 hover:rounded-lg px-2 rounded border-b"> Dating</li><br />
                  <li className="text-white cursor-pointer text-lg py-4 hover:bg-purple-500 hover:bg-opacity-20 hover:rounded-lg px-2 rounded border-b">Matrimony</li><br />
                  <li className="text-white cursor-pointer text-lg py-4 hover:bg-purple-500 hover:bg-opacity-20 hover:rounded-lg px-2 rounded border-b">E commerce</li><br />
                  <li className="text-white cursor-pointer text-lg py-4 hover:bg-purple-500 hover:bg-opacity-20 hover:rounded-lg px-2 rounded border-b">Study Abroad</li><br />
                  <li className="text-white cursor-pointer text-lg py-4 hover:bg-purple-500 hover:bg-opacity-20 hover:rounded-lg px-2 rounded border-b">Job Portal</li><br />
                </ul>
            
            </DrawerBody>
          </DrawerContent>
        </Drawer>
    </div>
  );
}

export default Sidemenu;
