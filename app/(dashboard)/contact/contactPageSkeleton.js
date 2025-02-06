import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ContactPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex md:flex-row flex-col-reverse gap-6">
        {/* Left Section - Form Skeleton */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            <Skeleton width={150} height={30} />
          </h2>
          <p className="text-gray-600 mb-6">
            <Skeleton count={2} />
          </p>
          {/* Form Skeleton */}
          <div className="space-y-4">
            <div>
              <Skeleton width={120} height={20} />
              <Skeleton className="w-full mt-2" height={40} />
            </div>
            <div>
              <Skeleton width={120} height={20} />
              <Skeleton className="w-full mt-2" height={40} />
            </div>
            <div>
              <Skeleton width={150} height={20} />
              <Skeleton className="w-full mt-2" height={40} />
            </div>
            <div>
              <Skeleton width={150} height={20} />
              <Skeleton className="w-full mt-2" height={100} />
            </div>
          </div>
          <div className="mt-4">
            <Skeleton width={150} height={40} />
          </div>
        </div>

        {/* Right Section - Image and Social Links Skeleton */}
        <div className="flex flex-col justify-center items-center gap-8 py-8 px-6">
          {/* Image Skeleton */}
          <Skeleton className="shrink-0 w-5/6 rounded-md" height={400} />

          {/* Social Icons Skeleton */}
          <div className="flex space-x-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} circle width={40} height={40} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPageSkeleton;
