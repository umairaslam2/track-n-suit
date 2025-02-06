import React from 'react'

const Occassion = () => {
  return (
    <div className='"relative h-[500px] flex w-full overflow-hidden '>

        <span className='h-full w-1/2 relative z-10'>
            <img src="Images/trackhero2.webp" className='h-full w-full  object-fit ' alt="" />
        </span>
        <span className="relative z-10 bg-gray-900 w-1/2 text-white h-full gap-4 justify-center items-center flex-col flex   ">
        <span className="bg-[url('/images/texture.jpg')] absolute inset-0 opacity-50 bg-cover bg-center  h-full w-full"></span>
            <h1 className='text-4xl font-bold capitalize relative z-10'>for the occassion</h1>
            <h1 className='text-md font-semibold relative z-10'>Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec</h1>
            <button className='bg-blue-gray-400 p-2 hover:bg-blue-gray-700 hover:text-blue-gray-100 rounded-lg  border text-xl'>view more</button>
        </span>
    
    </div>
  )
}

export default Occassion