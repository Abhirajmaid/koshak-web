'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { products, categories } from '@/data/products';
import { Filter, Grid, List, Scale, Star, Heart } from 'lucide-react';
import { useCompare } from '@/contexts/CompareContext';
import CompareProducts from '@/components/CompareProducts';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  
  const { addToCompare, isInCompare, compareCount } = useCompare();

  const hapticFeedback = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleAddToCompare = (product: any) => {
    if (addToCompare(product)) {
      hapticFeedback();
    }
  };

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
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
                  onClick={() => setSelectedCategory('all')}
                  className={`flex-shrink-0 text-center group ${selectedCategory === 'all' ? '' : ''}`}
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 ${selectedCategory === 'all' ? 'border-royal-gold ring-2 ring-royal-gold/40' : 'border-royal-brown/20'} bg-royal-cream/40 flex items-center justify-center shadow`}> 
                    <span className="font-royal text-royal-red text-xs sm:text-sm">All</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-[11px] sm:text-xs text-royal-brown/80 whitespace-nowrap">All Products</span>
                  </div>
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex-shrink-0 text-center group"
                    title={category.name}
                  >
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 overflow-hidden shadow ${selectedCategory === category.id ? 'border-royal-gold ring-2 ring-royal-gold/40' : 'border-royal-brown/20'}`}>
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="mt-1">
                      <span className="text-[11px] sm:text-xs text-royal-brown/80 whitespace-nowrap">{category.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-royal-brown/20">
            <p className="text-royal-brown/70">
              Showing {sortedProducts.length} of {products.length} products
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-4 ${
          viewMode === 'grid' 
            ? 'grid-cols-2 lg:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {viewMode === 'grid' ? (
                // Grid View - Golden Ratio Cards with Image Overlay
                <Link
                  href={`/product/${product.id}`}
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
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-royal-red text-white px-2 py-1 rounded-full text-xs font-semibold z-30">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}

                    {/* Product Info Overlay - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 sm:p-4">
                      <h3 className="font-semibold text-white mb-1 text-sm sm:text-base line-clamp-1">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm sm:text-base">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-white/70 text-xs line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-royal-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              ) : (
                // List View
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                  <div className="flex flex-col md:flex-row">
                    {/* Product Image */}
                    <div className="w-full md:w-48 h-48 flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-royal-red to-royal-maroon flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 mx-auto mb-2 bg-royal-gold/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-royal text-royal-gold">
                              {product.name.charAt(0)}
                            </span>
                          </div>
                          <p className="text-royal-cream/80 text-xs">Product Image</p>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between h-full">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="text-royal-gold fill-current"
                                />
                              ))}
                            </div>
                            <span className="text-royal-brown/60 text-sm ml-2">(4.8)</span>
                          </div>

                          <h3 className="font-semibold text-royal-red text-xl mb-2">
                            {product.name}
                          </h3>

                          <p className="text-royal-brown/70 mb-4">
                            {product.description}
                          </p>

                          <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-royal-brown/60 text-sm">Colors:</span>
                              <div className="flex space-x-1">
                                {product.colors.slice(0, 3).map((color, colorIndex) => (
                                  <div
                                    key={colorIndex}
                                    className={`w-4 h-4 rounded-full border border-royal-brown/20 ${
                                      color.toLowerCase().includes('red') || color.toLowerCase().includes('maroon') ? 'bg-red-800' :
                                      color.toLowerCase().includes('gold') || color.toLowerCase().includes('golden') ? 'bg-yellow-400' :
                                      color.toLowerCase().includes('blue') || color.toLowerCase().includes('royal') ? 'bg-blue-800' :
                                      color.toLowerCase().includes('green') || color.toLowerCase().includes('emerald') ? 'bg-green-800' :
                                      color.toLowerCase().includes('purple') || color.toLowerCase().includes('violet') ? 'bg-purple-800' :
                                      'bg-amber-700'
                                    }`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-royal-brown/60 text-sm">Sizes:</span>
                              <span className="text-royal-brown text-sm">{product.sizes.join(', ')}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between items-end">
                          <div className="text-right mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-royal-red text-xl">
                                ₹{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && (
                                <span className="text-royal-brown/50 text-sm line-through">
                                  ₹{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            {product.originalPrice && (
                              <div className="text-green-600 text-sm font-medium">
                                Save ₹{(product.originalPrice - product.price).toLocaleString()}
                              </div>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            <button className="p-2 text-royal-brown hover:text-royal-red transition-colors duration-300">
                              <Heart size={20} />
                            </button>
                            <Link
                              href={`/product/${product.id}`}
                              className="btn-primary"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
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