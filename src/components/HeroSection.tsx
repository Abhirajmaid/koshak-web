'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';


const HeroSection = () => {
  return (
    <section className="relative flex items-start justify-center overflow-hidden bg-gradient-to-br from-royal-grey via-white to-royal-grey">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-indian-pattern"></div>
      </div>

      {/* Removed decorative elements as requested */}

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 gap-4 lg:gap-8 items-start">
          {/* Hero Image Only */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
              {/* Main Image Container - 70% of screen height on mobile */}
              <div className="relative w-full h-[60vh] sm:h-[55vh] md:h-[520px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Beautiful Indian woman in elegant red silk saree with traditional jewelry and graceful pose"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-red/15 to-transparent"></div>
                
                {/* Overlay content copied from left section */}
                <div className="absolute bottom-2 left-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg max-w-xl">
                    <div className="flex items-center mb-2">
                      <Sparkles className="text-royal-gold mr-2" size={18} />
                      <span className="text-royal-brown font-medium tracking-wide text-xs sm:text-sm">
                        Premium Indo-Western Collection
                      </span>
                    </div>
                    <h2 className="font-royal text-xl sm:text-2xl font-bold text-royal-red leading-snug">
                      Embrace Your <span className="text-royal-gold">Royal Heritage</span>
                    </h2>
                    <p className="text-royal-brown/80 text-xs sm:text-sm mt-2">
                      Discover exquisite Indo-Western clothing that blends traditional Indian craftsmanship with contemporary elegance. Perfect for every celebration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute -inset-2 sm:-inset-4 border-2 sm:border-4 border-royal-gold/30 rounded-3xl -z-10"></div>
              
              {/* Removed floating animations as requested */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;