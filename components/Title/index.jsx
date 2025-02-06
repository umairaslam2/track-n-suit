import React from 'react'
import { HiArrowSmRight,HiArrowSmLeft } from "react-icons/hi";

export const Title = ({title,Subtitle}) => {
  return (
    <>
    <span className='text-secondary flex capitalize items-center gap-4  py-4 px-2 rounded-lg'>
        <span className=' bg-secondary text-secondary  rounded-lg py-6 px-4 myfont'></span>
       <h1 className='flex justify-center items-center '>{title}</h1> 
        </span>
    <div className='flex justify-between items-center myfont'>
    <span>
        <span className='text-xl capitalize md:text-4xl my-2 mx-2 text-black font-black'>
        <h1>{Subtitle}</h1> 
        </span>
      </span>   
      <span>
{/* 
<button className="px-4 py-2 mr-2 bg-gray-400 text-white rounded hover:bg-blue-300 " >
<HiArrowSmLeft color='black'/>
</button>
<button className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-blue-300 ">
<HiArrowSmRight color='black'/>
</button> */}
</span>
        </div>
        </>
  )
}
