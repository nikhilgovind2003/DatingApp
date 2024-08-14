import React from 'react'
import { MatchCardComponent } from '../Components'
import { Userdata } from '../datas/Userdata'
import { ChevronDown,MapPin, Search, SlidersHorizontal } from 'lucide-react';
import Button from '../components/buttons/InterestButton';

function DiscoverPage() {
  return (
    <div>
      <div className='p-2 lg:w-full sm: w-screen h-screen overflow-y-auto'>
        {/* Top Navbar */}
        <div className='top-nav flex justify-between items-center'>
          <div>
            <span className='flex'> Germany <ChevronDown /></span>
            <h3 className='text-2xl font-semibold'>Discover</h3>
          </div>
          <div className='flex gap-4'>
            <div className='border rounded-full border-gray-800 p-2'>
              <Search />
            </div>
            <div className='border rounded-full border-gray-800 p-2'>
              <SlidersHorizontal />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className='w-full overflow-x-auto mt-4'>
          <div className='flex gap-'>
            {Userdata?.map((user, i) => (
              <div key={i} className='min-w-[200px] flex-shrink-0'>
                <MatchCardComponent
                  isNew={true}
                  img={user.img}
                  distance={user.distance}
                  name={user.firstName}
                  age={user.age}
                  place={user.place}
                  match={user.match}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Interest */}
        <div>
          <div className='text-3xl mt-4 font-semibold flex  justify-between'>
            <h3>Interest</h3>
            <h3 className='text-pink-400 text-lg'>View all</h3>
          </div>
          <div className="flex gap-2 flex-wrap">
            {/* Interests */}
            <Button text="Music" icon="🎵"  selected={true} />
          </div>
        </div>

        {/* Around me */}
        <div>
          <div>
            <h3 className='text-2xl font-semibold'>Around Me</h3>
            <h3 className='text-lg'>
              People with <span className='text-pink-400'>"Music"</span> interest around you
            </h3>
          </div>
          <div className='googlemap'>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096887!2d144.9559280153495!3d-37.81720974201913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5779f1cd1e47f16!2sVictoria%20State%20Library!5e0!3m2!1sen!2sau!4v1635762309277!5m2!1sen!2sau"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscoverPage;
