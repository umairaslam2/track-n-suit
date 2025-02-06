import React from 'react';

export const ProductSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4'>
      {Array(3).fill().map((_, index) => (
        <div
        key={index}
        className="min-w-full max-w-[12rem] h-80 bg-gray-200 animate-pulse shadow-lg rounded-lg flex flex-col items-center justify-start p-4"
      >
        {/* Image Placeholder */}
        <div className="h-40 w-full bg-gray-300 rounded-md mb-4"></div>
      
        {/* Title Placeholder */}
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
      
        {/* Subtitle Placeholder */}
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-4"></div>
      
        {/* Button Placeholder */}
        <div className="h-8 w-2/3 bg-gray-300 rounded"></div>
      </div>
      ))}
    </div>
  );
};
