import { ChevronLeft, Settings2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const SubHeader = ({title = ''}) => {
  return (
    <header className=' lg:hidden flex justify-between items-center'>
       <Link to="/">
       <button className='w-12 h-12 p-2 border rounded-full grid place-items-center'>
            <ChevronLeft className='w-8 h-8'/>
        </button>
        </Link>
        <h1 className='text-3xl text-text font-medium'>{title}</h1>
        <button className='w-12 h-12 p-2 border rounded-full grid place-items-center'>
            <Settings2 className='w-8 h-8'/>
        </button>
    </header>
  )
}

export default SubHeader