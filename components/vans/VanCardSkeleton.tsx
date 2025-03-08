const VanCardSkeleton = () => {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
        {/* Image Skeleton */}
        <div className="w-full h-56 bg-gray-300"></div>
  
        {/* Content Skeleton */}
        <div className="p-4">
          <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
  
          <div className="flex items-center justify-between mt-2">
            {/* Location */}
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            {/* Type Badge */}
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
          </div>
  
          <div className="flex items-center justify-between mt-3">
            {/* Price */}
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
            {/* Rating */}
            <div className="h-4 w-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default VanCardSkeleton;
  