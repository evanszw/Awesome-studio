import { motion, AnimatePresence } from "motion/react";
import { LucideIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ServiceCardProps {
  key?: string | number;
  title: string;
  description?: string;
  icon: LucideIcon;
  index: number;
  imageUrl?: string;
  isSelected?: boolean;
  onToggle?: () => void;
}

export default function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  index, 
  imageUrl,
  isSelected,
  onToggle 
}: ServiceCardProps) {
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading delay for better UX demonstration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000 + index * 50); // Slightly staggered finish
    return () => clearTimeout(timer);
  }, [index]);

  const handleInteraction = () => {
    if (cardRef.current && !loading) {
      // Small delay to allow the grid expansion animation to progress
      setTimeout(() => {
        if (!cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // If the bottom of the card is cut off
        if (rect.bottom > viewportHeight) {
          cardRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end", // Scroll just enough to show the bottom
          });
        }
      }, 350); // Matches the 300ms transition + a tiny buffer
    }

    if (!loading && onToggle) {
      onToggle();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={!loading ? { y: -8, scale: 1.02, transition: { duration: 0.2 } } : {}}
      onMouseEnter={handleInteraction}
      onFocus={handleInteraction}
      tabIndex={0}
      role="article"
      aria-labelledby={`service-title-${index}`}
      className={`group relative p-6 bg-brand-charcoal border overflow-hidden min-h-[200px] flex flex-col justify-end cursor-pointer focus:outline-none focus:border-brand-blue shadow-lg transition-all duration-300 ${isSelected ? 'border-brand-blue ring-1 ring-brand-blue shadow-brand-blue/20' : 'border-white/5 hover:border-brand-blue/30 hover:shadow-brand-blue/20'} ${!loading ? '' : 'cursor-default'}`}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 p-6 flex flex-col justify-end gap-4"
          >
            <div className="w-10 h-10 bg-white/5 rounded-xl animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 bg-white/5 rounded-md animate-pulse w-3/4" />
              <div className="h-2 bg-white/5 rounded-md animate-pulse w-1/2" />
            </div>
            {/* Shimmer effect overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
              animate={{ translateX: ["100%", "-100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="contents"
          >
            {/* Dim Background Image */}
            {imageUrl && (
              <div className="absolute inset-0 z-0">
                <img 
                  src={imageUrl} 
                  alt="" 
                  className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 group-hover:opacity-30 transition-all duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
              </div>
            )}

            {/* Accent Glow Overlay */}
            <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 z-10" />
            
            <div className="relative z-20 flex flex-col items-start gap-3 h-full justify-end">
              <div className="p-2.5 bg-brand-blue/10 group-hover:bg-brand-blue/30 transition-colors duration-300 rounded-xl">
                <Icon className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <h3 id={`service-title-${index}`} className="text-sm font-bold tracking-tight text-white group-hover:text-brand-blue transition-colors duration-300">
                  {title}
                </h3>
                <div className="grid transition-all duration-300 grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-white/60 leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-blue/30 group-hover:border-brand-blue transition-colors duration-300 z-20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-blue/30 group-hover:border-brand-blue transition-colors duration-300 z-20" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
