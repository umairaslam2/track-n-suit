const ProductCardSkeleton = () => {
    return (
      <div className="bg-white flex flex-col overflow-hidden animate-pulse">
        {/* Skeleton for the image */}
        <div className="relative h-[400px] sm:h-full sm:w-full bg-gray-300"></div>
        
        {/* Skeleton for product info */}
        <div className="p-2 flex-1 flex flex-col space-y-2">
          {/* Product Name Skeleton */}
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          {/* Product Description Skeleton */}
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          {/* Price and Compare Price Skeleton */}
          <div className="flex gap-2">
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
          </div>
          {/* Rating Skeleton */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-[14px] h-[14px] bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductCardSkeleton;