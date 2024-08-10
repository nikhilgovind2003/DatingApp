import React from 'react'
import { InteractionIcon } from '../Components'
import MatchCardComponent from '../components/matchCards/MatchCardComponent'
import { Userdata } from '../datas/Userdata'

const QualificationPage = () => {
  return (
    <div className='w-full md:px-0 px-5 h-screen overflow-y-auto'>
            <div>
                <InteractionIcon />
                <p className='text-text font-medium my-3 text-lg'>Your Matches <span className='text-light-purple'>42</span></p>
            </div>
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
    </div>
  )
}

export default QualificationPage