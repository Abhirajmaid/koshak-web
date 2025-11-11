'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Star, Scale, ArrowRight } from 'lucide-react';
import { useCompare } from '@/contexts/CompareContext';

interface CompareProductsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BuyNowItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

const CompareProducts = ({ isOpen, onClose }: CompareProductsProps) => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  const hapticFeedback = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleRemove = (productId: string) => {
    removeFromCompare(productId);
    hapticFeedback();
  };

  const handleClear = () => {
    clearCompare();
    hapticFeedback();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-royal-brown/20">
            <div className="flex items-center space-x-3">
              <Scale className="text-royal-gold" size={24} />
              <h2 className="font-royal text-xl sm:text-2xl font-bold text-royal-red">
                Compare Products
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              {compareList.length > 0 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClear}
                  className="text-royal-brown/60 hover:text-red-500 transition-colors text-sm"
                >
                  Clear All
                </motion.button>
              )}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 text-royal-brown/60 hover:text-royal-red transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {compareList.length === 0 ? (
              <div className="text-center py-12">
                <Scale className="mx-auto text-royal-brown/40 mb-4" size={64} />
                <h3 className="font-royal text-xl font-bold text-royal-red mb-2">
                  No Products to Compare
                </h3>
                <p className="text-royal-brown/70 mb-6">
                  Add products to compare their features, specifications, and prices.
                </p>
                <Link
                  href="/"
                  onClick={onClose}
                  className="btn-primary inline-flex items-center"
                >
                  Browse Products
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Product Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 items-stretch">
                  {compareList.map((product) => (
                    <div key={product.id} className="bg-royal-cream/20 rounded-xl p-4 relative flex flex-col h-full">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemove(product.id)}
                        className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-royal-brown/60 hover:text-red-500 transition-colors"
                      >
                        <X size={14} />
                      </motion.button>
                      
                      <div className="aspect-square rounded-lg overflow-hidden mb-3">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <h4 className="font-semibold text-royal-red mb-2 text-sm line-clamp-2 min-h-[40px]">
                        {product.name}
                      </h4>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={`${i < Math.floor(product.rating) ? 'text-royal-gold fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-royal-brown/60 text-xs ml-1">
                          ({product.rating})
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="font-bold text-royal-red text-lg">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-royal-brown/50 text-sm line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => {
                          // Create a minimal buy-now item and go directly to checkout
                          const buyNowItem: BuyNowItem = {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            originalPrice: product.originalPrice,
                            image: product.image,
                            size: product.sizes?.[0] || "",
                            color: product.colors?.[0] || "",
                            quantity: 1,
                          };
                          localStorage.setItem('buyNowItem', JSON.stringify(buyNowItem));
                          onClose();
                          window.location.href = '/checkout?buyNow=true';
                        }}
                        className="w-full btn-primary text-center block text-sm py-2 mt-auto"
                      >
                        Buy Product
                      </button>
                    </div>
                  ))}
                  
                  {/* Add More Slot */}
                  {compareList.length < 2 && (
                    <div className="bg-royal-cream/10 rounded-xl p-4 border-2 border-dashed border-royal-brown/20 flex flex-col items-center justify-center min-h-[300px]">
                      <Scale className="text-royal-brown/40 mb-3" size={32} />
                      <p className="text-royal-brown/60 text-sm text-center mb-4">
                        Add another product to compare
                      </p>
                      <Link
                        href="/"
                        onClick={onClose}
                        className="btn-secondary text-sm px-4 py-2"
                      >
                        Browse Products
                      </Link>
                    </div>
                  )}
                </div>

                {/* Comparison Table */}
                {compareList.length >= 2 && (
                  <div className="bg-white rounded-xl border border-royal-brown/20 overflow-hidden">
                    <div className="p-4 bg-royal-cream/20 border-b border-royal-brown/20">
                      <h3 className="font-semibold text-royal-red">Detailed Comparison</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-royal-brown/10">
                            <th className="text-left p-4 text-royal-red font-semibold">Feature</th>
                            {compareList.map((product) => (
                              <th key={product.id} className="text-left p-4 text-royal-red font-semibold min-w-[200px]">
                                {product.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-royal-brown/10">
                            <td className="p-4 font-medium text-royal-brown/70">Price</td>
                            {compareList.map((product) => (
                              <td key={product.id} className="p-4">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-royal-red">
                                    ₹{product.price.toLocaleString()}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-royal-brown/50 text-xs line-through">
                                      ₹{product.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                              </td>
                            ))}
                          </tr>
                          
                          <tr className="border-b border-royal-brown/10">
                            <td className="p-4 font-medium text-royal-brown/70">Rating</td>
                            {compareList.map((product) => (
                              <td key={product.id} className="p-4">
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        size={12}
                                        className={`${i < Math.floor(product.rating) ? 'text-royal-gold fill-current' : 'text-gray-300'}`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-royal-brown/60 text-xs">
                                    {product.rating} ({product.reviewCount})
                                  </span>
                                </div>
                              </td>
                            ))}
                          </tr>
                          
                          <tr className="border-b border-royal-brown/10">
                            <td className="p-4 font-medium text-royal-brown/70">Fabric</td>
                            {compareList.map((product) => (
                              <td key={product.id} className="p-4 text-royal-brown/80">
                                {product.fabric}
                              </td>
                            ))}
                          </tr>
                          
                          <tr className="border-b border-royal-brown/10">
                            <td className="p-4 font-medium text-royal-brown/70">Available Sizes</td>
                            {compareList.map((product) => (
                              <td key={product.id} className="p-4">
                                <div className="flex flex-wrap gap-1">
                                  {product.sizes.map((size) => (
                                    <span key={size} className="bg-royal-cream/50 text-royal-brown px-2 py-1 rounded text-xs">
                                      {size}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            ))}
                          </tr>
                          
                          <tr className="border-b border-royal-brown/10">
                            <td className="p-4 font-medium text-royal-brown/70">Colors</td>
                            {compareList.map((product) => (
                              <td key={product.id} className="p-4">
                                <div className="flex flex-wrap gap-1">
                                  {product.colors.map((color) => (
                                    <span key={color} className="bg-royal-cream/50 text-royal-brown px-2 py-1 rounded text-xs">
                                      {color}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            ))}
                          </tr>
                          
                          <tr>
                            <td className="p-4 font-medium text-royal-brown/70">Occasions</td>
                            {compareList.map((product) => (
                              <td key={product.id} className="p-4">
                                <div className="flex flex-wrap gap-1">
                                  {product.occasion.slice(0, 3).map((occ) => (
                                    <span key={occ} className="bg-royal-cream/50 text-royal-brown px-2 py-1 rounded text-xs">
                                      {occ}
                                    </span>
                                  ))}
                                  {product.occasion.length > 3 && (
                                    <span className="text-royal-brown/60 text-xs">
                                      +{product.occasion.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareProducts;