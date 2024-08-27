import React, { useEffect, useState } from 'react'
import { ButtonGroup, InteractionIcon, MatchCardComponent, SubHeader, UserIcon } from '../Components'
import { Userdata } from '../datas/Userdata'
import axios from 'axios'
import { Link } from 'react-router-dom'

const QualificationPage = () => {

  const[dataqualification,setQualification]=useState([])

const fetchQualificationMatches=async()=>{
  try {
    const response= await axios.get('http://localhost:5000/api/v1/users/profile/qualification',{ withCredentials: true })
  console.log(response.data);
  setQualification(response.data)
  } catch (error) {
    console.log(error);  
  }  
}

useEffect(()=>{
  fetchQualificationMatches()
},[])

  return (
    <section className='sm: w-screen md:w-full overflow-x-hidden lg:w-full pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto'>
      <div>
      <div className="flex justify-between items-center gap-5 overflow-x-auto  lg:w-full sm: w-screen  ">
          <button>
            <UserIcon add={"purple"} />
            <p className="mt-0.5 text-[14px]">My Story</p>
          </button>
          {Userdata?.map((user, i) => (
            <button key={i}>
              <UserIcon key={user.id} story={true} url={user.img} />
              <p className="mt-0.5 text-[14px]">{user.firstName}</p>
            </button>
          ))}
        </div>
        <ButtonGroup />

            <SubHeader title='Qualification'/>
                <InteractionIcon />
                <p className='text-text font-medium my-3 text-lg'>Your Matches <span className='text-light-purple'>42</span></p>
            </div>

            <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5'>
            {Userdata?.map((user, i) => (
               <Link to={`/profile/${user.id}`} 
               key={i} >
                <MatchCardComponent 
                isNew={false}
                img={user.img}
                distance={user.distance}
                name={user.name}
                age={user.age}
                place={user.place}
                match={user.match}
                />
                </Link>
            ))}
        </div>
    </section>
  )
}

export default QualificationPage