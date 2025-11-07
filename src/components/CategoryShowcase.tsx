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
              'kurtas': 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'lehengas': 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'sarees': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'sherwanis': 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'indo-western': 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'accessories': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            };

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
                      src={categoryImages[category.id as keyof typeof categoryImages] || categoryImages.kurtas}
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