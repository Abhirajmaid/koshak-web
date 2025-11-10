'use client';

import { motion } from 'framer-motion';

const HeroSection = () => {
  const videoId = 'eBGIQ7ZuuiU';
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&enablejsapi=1&iv_load_policy=3&cc_load_policy=0&fs=0&disablekb=1`;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <iframe
          src={embedUrl}
          className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ pointerEvents: 'none' }}
          title="Koshak Background Video"
        />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      {/* Centered Brand Name */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-royal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white text-center drop-shadow-2xl"
        >
          Koshak
        </motion.h1>
      </div>
    </section>
  );
};

export default HeroSection;