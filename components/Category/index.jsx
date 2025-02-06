"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay, } from 'swiper/modules';

import Image from 'next/image';
import Link from 'next/link';
const Category = () => {
  const shopItems = [
      {
          shop: "Womens ",
          image: "https://oxfit.com.pk/199-medium_default/women-s-olive-green-poly-fleece-tracksuit.jpg",
          
      },
      {
          shop: "Mens",
          image: "/Images/tracknsuit3.webp",
        },
        {
          shop: "Kids ",
          image: "/Images/tracksuit6.jpg",
    
        },
  ]
  return (
    <div className="flex justify-center items-center gap-20  h-full !pb-40"> 
    {
    shopItems.map((product, index)=>(
        <>
        <div  key={index} className="relative w-40 h-40 md:w-52 md:h-52 hover:cursor-pointer
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
            height={200}
            width={200}
            className='h-full w-full'
          />
        </div>
        </>
    ))
}
</div>
  
  )
}

export default Category












