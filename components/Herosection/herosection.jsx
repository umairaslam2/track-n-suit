"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay, } from 'swiper/modules';

const Herosection = () => {
  return (
    <>
     <Swiper 
     navigation={true} 
    modules={[Navigation, Pagination, A11y, Autoplay]}
    style={{
        '--swiper-navigation-size': '20px', 
        
      }}
      autoplay={{ 
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="mySwiper ">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  )
}

export default Herosection