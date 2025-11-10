'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { buildCategoryOptions } from '@/utils/category';

const CategoryShowcase = () => {
  const { products, isLoading } = useProducts();
  const categoryOptions = buildCategoryOptions(products);

  const visibleCategories = categoryOptions.slice(0, 8);
  const showSkeletons = isLoading && visibleCategories.length === 0;

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
          {showSkeletons
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`category-skeleton-${index}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-full bg-royal-cream/60 animate-pulse"
                />
              ))
            : visibleCategories.map((category, index) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex-shrink-0 text-center"
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href={`/category/${encodeURIComponent(category.key)}`}
                  onClick={() => {
                    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                      navigator.vibrate(50);
                    }
                  }}
                  className="block"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-royal-gold overflow-hidden shadow-md bg-white flex items-center justify-center">
                    {category.image ? (
                      <img 
                        src={category.image}
                        alt={`${category.label} collection`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-royal text-xs sm:text-sm text-royal-red px-2">
                        {category.label.charAt(0) || '#'}
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <h3 className="font-royal text-xs sm:text-sm font-semibold text-royal-red whitespace-nowrap">
                      {category.label}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          {(!showSkeletons && visibleCategories.length === 0) && (
            <div className="text-center text-royal-brown/70 text-sm">
              Add a product to see categories here.
            </div>
          )}
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