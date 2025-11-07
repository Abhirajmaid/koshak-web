'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { products, categories } from '@/data/products';
import { Scale, ArrowLeft } from 'lucide-react';
import { useCompare } from '@/contexts/CompareContext';
import CompareProducts from '@/components/CompareProducts';

interface CategoryClientProps {
  params: {
    id: string;
  };
}

const CategoryClient = ({ params }: CategoryClientProps) => {
  const [sortBy, setSortBy] = useState('featured');
  const [showCompare, setShowCompare] = useState(false);
  
  const { addToCompare, isInCompare, compareCount } = useCompare();
  
  const category = categories.find(c => c.id === params.id);
  const categoryProducts = products.filter(p => p.category === params.id);

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

  const sortedProducts = [...categoryProducts].sort((a, b) => {
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

  if (!category) {
    return (
      <div className="min-h-screen bg-royal-grey/30 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-royal text-3xl md:text-4xl font-bold text-royal-red mb-4">
            Category Not Found
          </h1>
          <p className="text-royal-brown/70 mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Link href="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-royal-grey/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/products"
            className="inline-flex items-center text-royal-brown hover:text-royal-red transition-colors duration-300"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Products
          </Link>
        </motion.div>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="font-royal text-3xl md:text-4xl font-bold text-royal-red mb-4">
            {category.name}
          </h1>
          <p className="text-royal-brown/80 text-lg mb-6">
            {category.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-royal-brown/70">
              {sortedProducts.length} products found
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-royal-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
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
            </motion.div>
          ))}
        </div>

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

export default CategoryClient;