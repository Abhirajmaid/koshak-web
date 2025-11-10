'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProducts } from '@/contexts/ProductContext';

const FeaturedProducts = () => {
  const { products, isLoading } = useProducts();
  const featuredProducts = products.filter(product => product.featured);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-royal-grey/40 to-white">
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
            Featured Collection
          </h2>
          <p className="text-base sm:text-lg text-royal-brown/80 max-w-2xl mx-auto px-4 sm:px-0">
            Handpicked premium pieces that showcase the finest in Indo-Western fashion
          </p>
          <div className="w-16 sm:w-24 h-1 bg-royal-gold mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        {/* Products Grid - Dual Column Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {(isLoading ? Array.from({ length: 4 }) : featuredProducts).map((product, index) => {
            if (isLoading) {
              return (
                <div
                  key={`featured-skeleton-${index}`}
                  className="h-64 rounded-2xl bg-royal-grey/30 animate-pulse"
                />
              );
            }

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/product/${encodeURIComponent(
                    product.slug || product.handle || product.id,
                  )}?productId=${encodeURIComponent(product.id)}`}
                  onClick={() => {
                    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                      navigator.vibrate(50);
                    }
                  }}
                  className="block"
                >
                  <div className="relative rounded-xl sm:rounded-2xl shadow-lg overflow-hidden card-hover aspect-[5/8] sm:aspect-[8/13] md:aspect-[5/8]">
                    {/* Product Image - Full Card */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Discount Badge */}
                    {product.originalPrice ? (
                      <div className="absolute top-2 left-2 bg-royal-red text-white px-2 py-1 rounded-full text-xs font-semibold z-30">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    ) : null}

                    {/* Product Info Overlay - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 sm:p-4">
                      <h3 className="font-semibold text-white mb-1 text-sm sm:text-base line-clamp-1">
                        {product.name}
                      </h3>

                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm sm:text-base">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice ? (
                          <span className="text-white/70 text-xs line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-royal-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10 lg:mt-12"
        >
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href="/products"
              onClick={() => {
                if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                  navigator.vibrate(50);
                }
              }}
              className="btn-secondary inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
            >
              View All Products
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;