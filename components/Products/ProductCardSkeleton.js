const ProductCardSkeleton = () => {
  return (
    <>
      {Array(6)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className="w-full h-[25rem] bg-gray-200 animate-pulse shadow-lg rounded-lg flex flex-col items-center justify-start p-4"
          >
            {/* Image Placeholder */}
            <div className="h-56 w-full bg-gray-300 rounded-md mb-4"></div>

            {/* Title Placeholder */}
            <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>

            {/* Subtitle Placeholder */}
            <div className="h-4 w-1/2 bg-gray-300 rounded mb-4"></div>

            {/* Button Placeholder */}
            <div className="h-8 w-2/3 bg-gray-300 rounded"></div>
          </div>
        ))}
    </>
  );
};

export default ProductCardSkeleton;
