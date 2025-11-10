'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Scale } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import type { Product } from '@/types';
import { useCompare } from '@/contexts/CompareContext';
import CompareProducts from '@/components/CompareProducts';
import { buildCategoryOptions, normalizeCategoryId } from '@/utils/category';

const ProductsPage = () => {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showCompare, setShowCompare] = useState(false);

  const { products: catalogProducts, isLoading } = useProducts();
  const { compareCount } = useCompare();

  const categories = useMemo(() => buildCategoryOptions(catalogProducts), [catalogProducts]);

  const hapticFeedback = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const filteredProducts = catalogProducts.filter(product => 
    selectedCategoryKey === 'all' || normalizeCategoryId(product.category ?? '') === selectedCategoryKey
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return b.featured ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-royal-grey/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="font-royal text-3xl md:text-4xl font-bold text-royal-red mb-4">
            Our Collection
          </h1>
          <p className="text-royal-brown/80 text-lg">
            Discover our complete range of premium Indo-Western clothing
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Category Filter - Stories style */}
            <div className="w-full">
              <div className="flex items-start gap-3 overflow-x-auto pb-1">
                <button
                  onClick={() => setSelectedCategoryKey('all')}
                  className="flex-shrink-0 text-center group"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 ${selectedCategoryKey === 'all' ? 'border-royal-gold ring-2 ring-royal-gold/40' : 'border-royal-brown/20'} bg-royal-cream/40 flex items-center justify-center shadow`}> 
                    <span className="font-royal text-royal-red text-xs sm:text-sm">All</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-[11px] sm:text-xs text-royal-brown/80 whitespace-nowrap">All Products</span>
                  </div>
                </button>
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategoryKey(category.key)}
                    className="flex-shrink-0 text-center group"
                    title={category.label}
                  >
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 overflow-hidden shadow flex items-center justify-center ${selectedCategoryKey === category.key ? 'border-royal-gold ring-2 ring-royal-gold/40' : 'border-royal-brown/20'}`}>
                      {category.image ? (
                        <img src={category.image} alt={category.label} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-royal text-royal-red text-xs sm:text-sm px-2">
                          {category.label.charAt(0) || '#'}
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      <span className="text-[11px] sm:text-xs text-royal-brown/80 whitespace-nowrap">{category.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-royal-brown/20">
            <p className="text-royal-brown/70">
              Showing {sortedProducts.length} of {catalogProducts.length} products
            </p>
          <div className="mt-4 flex justify-end">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-royal-brown/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal-gold"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {(isLoading ? Array.from({ length: 8 }) : sortedProducts).map((maybeProduct, index) => {
            if (isLoading) {
              return (
                <div
                  key={`product-skeleton-${index}`}
                  className="h-64 rounded-2xl bg-royal-grey/30 animate-pulse"
                />
              );
            }

            const product = maybeProduct as Product | undefined;
            if (!product) {
              return null;
            }

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
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
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {product.originalPrice ? (
                      <div className="absolute top-2 left-2 bg-royal-red text-white px-2 py-1 rounded-full text-xs font-semibold z-30">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    ) : null}

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

                    <div className="absolute inset-0 bg-royal-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={hapticFeedback}
            className="btn-secondary"
          >
            Load More Products
          </motion.button>
        </motion.div>

        {/* Floating Compare Button */}
        {compareCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 z-40"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                hapticFeedback();
                setShowCompare(true);
              }}
              className="bg-royal-red text-white rounded-full p-3 shadow-lg hover:bg-royal-maroon transition-colors duration-300 flex items-center space-x-2"
            >
              <Scale size={20} />
              <span className="font-medium">Compare ({compareCount})</span>
            </motion.button>
          </motion.div>
        )}

        {/* Compare Modal */}
        <CompareProducts 
          isOpen={showCompare} 
          onClose={() => setShowCompare(false)} 
        />
      </div>
    </div>
  );
};

export default ProductsPage;