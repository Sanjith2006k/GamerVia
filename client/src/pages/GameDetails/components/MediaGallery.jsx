import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const MediaGallery = ({ screenshots, movies }) => {
  const [activeMedia, setActiveMedia] = useState(null); // { type: 'image' | 'video', src: string }

  const hasMedia = (screenshots && screenshots.length > 0) || (movies && movies.length > 0);

  if (!hasMedia) return null;

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-heading font-semibold text-white mb-6">Media Gallery</h3>
      
      <div className="flex overflow-x-auto pb-4 gap-4 snap-x hide-scrollbar">
        {/* Trailers first */}
        {movies?.map((movie, idx) => (
          <div 
            key={`movie-${idx}`} 
            className="relative flex-none w-72 md:w-96 aspect-video rounded-xl overflow-hidden cursor-pointer group snap-start border border-white/10"
            onClick={() => setActiveMedia({ type: "video", src: movie.data?.max || movie.data?.["480"] })}
          >
            <img src={movie.preview} alt="Trailer preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-accent/80 flex items-center justify-center backdrop-blur text-white shadow-lg group-hover:scale-110 transition-transform">
                <Play size={24} fill="currentColor" className="ml-1" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white backdrop-blur">
              Trailer
            </div>
          </div>
        ))}

        {/* Screenshots */}
        {screenshots?.map((img, idx) => (
          <div 
            key={`img-${idx}`} 
            className="relative flex-none w-72 md:w-96 aspect-video rounded-xl overflow-hidden cursor-pointer group snap-start border border-white/10"
            onClick={() => setActiveMedia({ type: "image", src: img })}
          >
            <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur flex items-center justify-center p-4 md:p-12"
            onClick={() => setActiveMedia(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur z-[101]"
              onClick={() => setActiveMedia(null)}
            >
              <X size={32} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-6xl max-h-[85vh] relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {activeMedia.type === "image" ? (
                <img src={activeMedia.src} alt="Enlarged" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
              ) : (
                <video src={activeMedia.src} controls autoPlay className="w-full max-h-[85vh] rounded-lg shadow-2xl outline-none" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaGallery;
