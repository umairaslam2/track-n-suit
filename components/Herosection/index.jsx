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
}

