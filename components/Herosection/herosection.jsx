// "use client"
// import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, A11y, Autoplay, } from 'swiper/modules';

// const Herosection = () => {
//     return (
//         <>
//             <Swiper
//                 navigation={true}
//                 modules={[Navigation, Pagination, A11y, Autoplay]}
//                 id='hero-section'
//                 style={{
//                     '--swiper-navigation-size': '20px',

//                 }}
//                 autoplay={{
//                     delay: 3000,
//                     disableOnInteraction: false,
//                 }}
//                 className="mySwiper ">
//                 <SwiperSlide className='h-screen bg-blue-gray-300 relative'>
//                     {/* Image */}
//                     <span className='flex-shrink-0'>
//                         <img
//                             src="/Images/trackhero2.webp"
//                             className='h-screen w-screen object-fit'
//                             alt=""
//                         />
//                     </span>

//                     {/* Text Overlay */}
//                     <div className='absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50'>
//                         <div className='text-center'>
//                             <h1 className='text-4xl font-bold mb-4 '>Your Heading Here</h1>
//                             <p className='text-lg'>Your description or additional text goes here.</p>
//                             <button className='mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
//                                 Learn More
//                             </button>
//                         </div>
//                     </div>
//                 </SwiperSlide>

//                 <SwiperSlide className='h-screen bg-blue-gray-300 '>
//                     <span className='flex-shrink-0'>
//                         <img src="/Images/trackhero.jpg" className='h-screen w-screen  object-fit' alt="" />
//                     </span>
//                     <div className='absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50'>
//                         <div className='text-center'>
//                             <h1 className='text-4xl font-bold mb-4 '>Your Heading Here</h1>
//                             <p className='text-lg'>Your description or additional text goes here.</p>
//                             <button className='mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
//                                 Learn More
//                             </button>
//                         </div>
//                     </div>
//                 </SwiperSlide>
//                 <SwiperSlide className='h-screen bg-blue-gray-300 '>
//                     <span className='flex-shrink-0'>
//                         <img src="/Images/heroimg2.webp" className='h-screen w-screen  object-fit' alt="" />
//                     </span>
//                     <div className='absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50'>
//                         <div className='text-center'>
//                             <h1 className='text-4xl font-bold mb-4 '>Your Heading Here</h1>
//                             <p className='text-lg'>Your description or additional text goes here.</p>
//                             <button className='mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
//                                 Learn More
//                             </button>
//                         </div>
//                     </div>
//                 </SwiperSlide>
//                 <SwiperSlide className='h-screen bg-blue-gray-300 '>
//                     <span className='flex-shrink-0'>
//                         <img src="/Images/heroimg.webp" className='h-screen w-screen  object-fit' alt="" />
//                     </span>
//                     <div className='absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50'>
//                         <div className='text-center'>
//                             <h1 className='text-4xl font-bold mb-4 '>Your Heading Here</h1>
//                             <p className='text-lg'>Your description or additional text goes here.</p>
//                             <button className='mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
//                                 Learn More
//                             </button>
//                         </div>
//                     </div>
//                 </SwiperSlide>

//             </Swiper>
//         </>
//     )
// }

// export default Herosection







import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url("Images/trackhero2.webp")',
          backgroundAttachment: 'fixed',  // This will keep the background fixed
          backgroundPosition: 'top',
          backgroundSize: 'cover',
          backgroundRepeat:'no-repeat'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Your Hero Title</h1>
        <p className="text-lg md:text-2xl mb-8">A short description or tagline goes here</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">Learn More</button>
      </div>
    </div>
  );
};

export default HeroSection;


