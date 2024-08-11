import React from 'react'
import { MatchCardComponent, SubHeader } from '../Components'
import { Userdata } from '../datas/Userdata'

const ViewedMyProfilePage = () => {
  return (
    <section className='w-full pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto'>
        <SubHeader title='Viewed My Profile'/>
                <p className='font-medium mb-3 mt-5 text-lg text-light-purple'>47 new profiles views</p>
            <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5'>
                {Userdata?.map((user, i) => (
                    <MatchCardComponent
                        key={i}
                        isNew={false}
                        img={user.img}
                        distance={user.distance}
                        name={user.firstName}
                        age={user.age}
                        place={user.place}
                        match={user.match}
                    />
                ))}
            </div>
        </section>
  )
}

export default ViewedMyProfilePage