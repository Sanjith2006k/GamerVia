const LoadingSkeleton = ({ type = "card", count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (type === "card") {
    return (
      <>
        {skeletons.map((i) => (
          <div key={i} className="glass rounded-xl overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-white/5"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-white/5 rounded w-3/4"></div>
              <div className="h-4 bg-white/5 rounded w-1/2"></div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-5 bg-white/5 rounded w-1/4"></div>
                <div className="h-8 bg-white/5 rounded w-8"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === "hero") {
    return (
      <div className="w-full h-[70vh] glass animate-pulse relative">
        <div className="absolute inset-0 bg-white/5"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full max-w-3xl space-y-4">
          <div className="h-12 bg-white/10 rounded w-3/4"></div>
          <div className="h-6 bg-white/10 rounded w-full"></div>
          <div className="h-6 bg-white/10 rounded w-5/6"></div>
          <div className="flex gap-4 pt-4">
            <div className="h-12 bg-white/10 rounded w-32"></div>
            <div className="h-12 bg-white/10 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-12 bg-white/5 rounded animate-pulse"></div>
  );
};

export default LoadingSkeleton;
