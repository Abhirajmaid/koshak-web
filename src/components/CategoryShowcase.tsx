'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';


const CategoryShowcase = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-royal-red mb-3 sm:mb-4 px-2">
            Explore Our Collections
          </h2>
          <p className="text-base sm:text-lg text-royal-brown/80 max-w-2xl mx-auto px-4 sm:px-0">
            From traditional elegance to contemporary fusion, discover the perfect outfit for every occasion
          </p>
          <div className="w-16 sm:w-24 h-1 bg-royal-gold mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        {/* Categories Stories - Horizontal circles */}
        <div className="flex items-start gap-3 sm:gap-4 overflow-x-auto py-1">
          {categories.map((category, index) => {
            const categoryImages = {
              'oversized-tshirts': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
              'tshirts': 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=800&auto=format&fit=crop',
              'hoodies': 'https://images.unsplash.com/photo-1520971347561-4f0a0a1e496a?q=80&w=800&auto=format&fit=crop'
            } as Record<string, string>;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex-shrink-0 text-center"
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href={`/category/${category.id}`}
                  onClick={() => {
                    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                      navigator.vibrate(50);
                    }
                  }}
                  className="block"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-royal-gold overflow-hidden shadow-md bg-white">
                    <img 
                      src={categoryImages[category.id as keyof typeof categoryImages] || categoryImages['tshirts']}
                      alt={`${category.name} collection`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-royal text-xs sm:text-sm font-semibold text-royal-red whitespace-nowrap">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12 lg:mt-16"
        >
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href="/products"
              onClick={() => {
                if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                  navigator.vibrate(50);
                }
              }}
              className="btn-primary inline-flex items-center group px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
            >
              View All Products
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryShowcase;