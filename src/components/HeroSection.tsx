'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';


const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center bg-white py-24 sm:py-32">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-royal text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-royal-red text-center"
      >
        Koshak
      </motion.h1>
    </section>
  );
};

export default HeroSection;