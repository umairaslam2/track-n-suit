import React from 'react'

const Occassion = () => {
  return (
    <div className='"relative h-[500px] flex flex-col md:flex-row w-full overflow-hidden '>

        <span className='h-full w-full md:w-1/2 relative z-10'>
       
            <img src="https://cdn.shopify.com/s/files/1/0773/8628/5348/files/Blue_Pink_Modern_Special_Offer_Sale_Banner_4.jpg?v=1735194561" className='h-full w-full  object-fit ' alt="" />
        </span>
        <span className="relative z-10 bg-gray-900 w-full md:w-1/2 text-white h-96 md:h-full gap-4 justify-center items-center flex-col flex   ">
        <span className="bg-[url('/images/texture.jpeg')] absolute inset-0 opacity-50 bg-cover bg-center  h-full w-full"></span>
            <h1 className='text-4xl font-bold capitalize relative z-10'>Special Offer Flat 50% Off</h1>
            <span></span>
            {/* <h1 className='text-md font-semibold relative z-10'>Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec</h1> */}
            <button className='bg-blue-gray-900 p-2 hover:bg-blue-gray-700 hover:cursor-pointer text-gray-300 hover:text-blue-gray-100 rounded-lg  border text-xl'>view more</button>
        </span>
    
    </div>
  )
}

export default Occassion