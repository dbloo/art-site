interface SkeletonProps {
  className?: string;
}


export const Skeleton = ({className}:SkeletonProps ) => {
  return (
    <div className="animate-pulse opacity-50">
      <div className={`rounded-2xl w-full h-100 lg:h-120${className} bg-gray-300 mb-4`}></div>
      <div className="h-4 bg-gray-300 rounded-2xl w-full mb-2"></div>

      <div className="flex w-full flex-row justify-between gap-2">
      <div className="h-4 bg-gray-300 rounded-2xl w-10"></div>
      <div className="h-4 bg-gray-300 rounded-2xl w-30"></div>
      </div>
    </div>
  );
}

