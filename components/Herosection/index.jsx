<<<<<<< HEAD
"use client"
import React from "react";
import Image from "next/image";
import { Carousel } from "@material-tailwind/react";
export function Herosection() {

  const slides = [
    {
      image: "/Images/hero1.webp",
    },
    {
      image: "/Images/banner2.png",
    },
    {
      image: "/Images/banner3.png",
    },
  ];
  return (
    // <Carousel transition={{ duration: 500 }} loop={true} autoplay={true} className="rounded-xl h-1/2 bg-[#C9C9C9] relative z-9999">
    <Carousel  
    loop={true} 
    autoplay={true} 
    className="rounded-xl h-1/2 bg-[#C9C9C9] relative z-9999"
    navigation={({ setActiveIndex, activeIndex, length }) => (
      <div className="absolute bottom-4 left-2/4 z-9999 flex -translate-x-2/4 gap-2">
        {new Array(length).fill("").map((_, i) => (
          <span
            key={i}
            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
              activeIndex === i ? "w-8 bg-white " : "w-4 bg-white/50"
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    )}
    >
     {slides.map((item,index)=>(
        <span key={index}>
        <Image
        src={item.image}
        height={700}
        width={800}
        alt="image 1"
        // blurDataURL={carosel1}
        className="h-64 md:h-80 lg:h-96  w-full "
        // className="h-full  w-full "
      />
        </span>
     )) 
     }
    </Carousel>
  );
=======
import React from 'react'
import image from '@/public/Images/tesc.PNG'
const Herosection = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(image)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <Header />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <p className="text-lg uppercase tracking-widest">From $59</p>
        <h1 className="text-6xl font-bold uppercase mt-4 mb-6">ready to wear</h1>
        <button className="px-6 py-3 bg-white text-black font-semibold uppercase tracking-widest hover:bg-gray-300 transition">
          Shop Now
        </button>
      </div>
      <div className="absolute bottom-10 right-10 z-10 text-white text-center">
        <p className="uppercase text-sm">03</p>
        <div className="flex flex-col items-center mt-2">
          <button className="mb-2 bg-pink-500 px-4 py-2 rounded-full">Related</button>
          <button className="bg-white text-black px-4 py-2 rounded-full">Buy Now</button>
        </div>
      </div>
    </div>
  )
>>>>>>> e4235bbd86b027a91d0ac511412f9d9a6740b37a
}

