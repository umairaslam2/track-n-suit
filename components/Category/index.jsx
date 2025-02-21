"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay, } from 'swiper/modules';

import Image from 'next/image';
import Link from 'next/link';
const Category = () => {
  const shopItems = [
      {
          shop: "New Born",
          image: "https://img.freepik.com/premium-photo/adorable-baby-boy-asking-hug-with-hands-up_112112-1720.jpg?ga=GA1.1.769418074.1724743994&semt=ais_hybrid",
          
      },
      {
          shop: "Men",
          image: "/Images/tracknsuit3.webp",
        },
        {
          shop: "Kids",
          image: "/Images/tracksuit6.jpg",
    
        },
  ]
  return (
    <div className="flex justify-center items-center overflow-x-auto  gap-10 md:gap-20 w-full   !pb-40"> 
    {
    shopItems.map((product, index)=>(
        <>
        <div  key={index} className="relative min-w-60 h-60 md:w-72 md:h-72  hover:cursor-pointer
         rounded-full bg-gray-200 overflow-hidden group">
          <div className="absolute left-0 w-1/2 h-full overflow-hidden bg-black opacity-70 transition-all duration-700 group-hover:translate-x-[-100%]">
          </div>
    
          <div className="absolute right-0 w-1/2 h-full overflow-hidden bg-black opacity-70  transition-all duration-700 group-hover:translate-x-[100%]">
    
          </div>
    
          <div className="absolute inset-0 flex justify-center items-center text-white text-xl font-bold pointer-events-none">
            {product.shop}
          </div>
          <Image
            src={product.image}
            height={800}
            width={800}
            className='h-full w-full '
          />
        </div>
        </>
    ))
}
</div>
  
  )
}

export default Category












