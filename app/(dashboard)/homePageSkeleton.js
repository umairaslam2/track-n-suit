import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HomePageSkeleton = () => {
  return (
    <span className="pb-5 h-full">
      {/* Hero Section Skeleton */}
      <div
        className="mb-8"
      >
        <Skeleton height={300} width="100%" />
      </div>

      {/* Tester Category Skeleton */}
      <div
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mb-8"
      >
        <Skeleton height={200} width="100%" />
      </div>

      {/* Men Category Skeleton */}
      <div className="mb-8">
        <Skeleton height={200} width="100%" />
      </div>

      {/* Women Category Skeleton */}
      <div className="mb-8">
        <Skeleton height={200} width="100%" />
      </div>

      {/* Other Category Skeleton */}
      <div className="mb-8">
        <Skeleton height={200} width="100%" />
      </div>

      {/* Top Products Skeleton */}
      <span>
        <div className="mb-4">
          <Skeleton height={30} width={150} />
          <Skeleton height={20} width={100} className="mt-2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="p-4">
              <Skeleton height={150} width="100%" />
              <Skeleton height={20} width="80%" className="mt-2" />
              <Skeleton height={20} width="60%" className="mt-1" />
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center py-5">
          <Skeleton height={40} width={140} />
        </div>
      </span>

      {/* New Arrivals Skeleton */}
      <div className="mt-10">
        <div className="mb-4">
          <Skeleton height={30} width={150} />
          <Skeleton height={20} width={100} className="mt-2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="p-4">
              <Skeleton height={150} width="100%" />
              <Skeleton height={20} width="80%" className="mt-2" />
              <Skeleton height={20} width="60%" className="mt-1" />
            </div>
          ))}
        </div>
      </div>
    </span>
  );
};

export default HomePageSkeleton;
