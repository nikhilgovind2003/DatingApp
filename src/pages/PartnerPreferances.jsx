import React from 'react';
import {ChakraProvider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import PageTitle from '../components/PageTitle/PageTitle';
import { Search } from 'lucide-react';

function PartnerPreferances() {
 

  return (
    <div className=" bg-deep-plum  pt-2 h-screen   overflow-scroll   ">
        <PageTitle icon={Search} pageTitle={'Privacy & Settings  '} />
       <div className='bg-white rounded-t-3xl px-8 h-screen py-6 overflow-y-auto'>
      <div className='text-2xl mb-2 font-semibold'><h1></h1>Partner Preference</div>
      
     <div className=''> <h1>Age</h1><h1>18-35</h1></div>
      <ChakraProvider>
      <Slider defaultValue={18} width="100%"
      aria-label='Age' min={18} max={35}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      </ChakraProvider>
     
<h1>Gender</h1>
<select className="mt-2 mb-4  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
<option value="option2" selected>Select (default)</option>

  <option value="option1">Male</option>
  <option value="option3">Female</option>
  <option value="option3">Other</option>
</select>    

<br />
<div><h1>Locations</h1>
<br />
<button className='bg-gray-500 hover:bg-blue-700 text-white  px-4 rounded mx-2'>Kochi</button>
<button className='bg-gray-500 hover:bg-blue-700 text-white  px-4 rounded mx 4'>Kollam</button >
<button className='bg-gray-500 hover:bg-blue-700 text-white  px-4 rounded mx-2'>Aluva</button >
</div>
<br />
<div><h1>Intrests&Hobbies</h1>
<br />
<button className='bg-gray-500 hover:bg-blue-700 text-white  px-4 rounded mx-2'>Yoga</button>
<button className='bg-gray-500 hover:bg-blue-700 text-white  px-4 rounded mx 4'>Jazz</button >
<button className='bg-gray-500 hover:bg-blue-700 text-white  px-4 rounded mx-2'>Reading</button >
</div>

      <br />
      <h1>Education Level</h1>
      <select className="mt-2 mb-6  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
<option value="option2" selected>Select (default)</option>

  <option value="option1">Higher secondory</option>
  <option value="option3">Graduation</option>
  <option value="option3">Masters</option>
</select>    

<div className=''> <h1>Height</h1><h1>cm100-220</h1></div>
      <ChakraProvider>
      <Slider defaultValue={100} width="100%"
      aria-label='Height' min={100} max={220}
       
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      </ChakraProvider>
      <br />

<div className=''> <h1>Weight</h1><h1>kg40-150</h1></div>
      <ChakraProvider>
      <Slider defaultValue={40} width="100%"
      aria-label='Height' min={40} max={150}
        
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      </ChakraProvider>
      <br />
      <h1>Lifestyle Choices</h1>
      <select className="mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
      <option value="option2" selected>Select (default)</option>

     
<option value="option1">Social activities</option>
<option value="option3">Arts and culture</option>
<option value="option3">Indoor activities</option>
<option value="option4">Indoor activities</option>
</select>      

<br /><br />
      <h1>Religion</h1>
      <select className="mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
      <option value="option2" selected>Select (default)</option>

     
<option value="option1">Christian</option>
<option value="option3">Muslim</option>
<option value="option3">Hindhu</option>
<option value="option4">Jain</option>
<option value="option5">Sikh</option>
<option value="option6">Other</option>
</select>      

<br /><br />
      <h1>Occupation</h1>
      <select className="mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
      <option value="option2" selected>Select (default)</option>

     
<option value="option1">Student</option>
<option value="option3">Business</option>
<option value="option3">Healthcare</option>
<option value="option4">Construction</option>
<option value="option5">Retail</option>
<option value="option6">Other</option>
</select>      

    </div>
    </div>
  );
}

export default PartnerPreferances;