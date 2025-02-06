"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function BlogSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="relative w-full h-96">
        <Skeleton height="100%" width="100%" />
      </div>

      {/* Blog Cards Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-white shadow-md overflow-hidden"
            >
              {/* Blog Image Skeleton */}
              <div className="relative w-full h-64">
                <Skeleton height="100%" width="100%" />
              </div>
              <div className="p-4">
                {/* Category and Date Skeleton */}
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Skeleton width={100} height={20} className="mr-2" />
                  <Skeleton width={60} height={20} />
                </div>

                {/* Title Skeleton */}
                <Skeleton width="80%" height={20} className="mb-2" />

                {/* Description Skeleton */}
                <Skeleton count={2} height={15} className="mb-4" />

                {/* Button Skeleton */}
                <Skeleton width={100} height={30} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width={40} height={40} borderRadius={5} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
