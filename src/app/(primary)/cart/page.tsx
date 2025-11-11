'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Heart } from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cart-updated'));
    }
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cart-updated'));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => 
    sum + ((item.originalPrice - item.price) * item.quantity), 0
  );
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-royal-grey/30 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ShoppingBag className="mx-auto text-royal-brown/40 mb-6" size={80} />
            <h1 className="font-royal text-3xl md:text-4xl font-bold text-royal-red mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-royal-brown/70 mb-8 text-lg">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/"
              className="btn-primary inline-flex items-center"
            >
              <ArrowLeft className="mr-2" size={20} />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-royal-grey/30 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              onClick={() => {
                if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                  navigator.vibrate(50);
                }
              }}
              className="inline-flex items-center text-royal-brown hover:text-royal-red transition-colors duration-300 mb-3 sm:mb-4 text-sm sm:text-base"
            >
              <ArrowLeft className="mr-2" size={18} />
              Continue Shopping
            </Link>
          </motion.div>
          <h1 className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold text-royal-red">
            Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4 sm:space-y-6">
              {cartItems.map((item, index) => {
                const productImages = [
                  'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                ];

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="w-full sm:w-24 md:w-32 h-24 sm:h-24 md:h-32 flex-shrink-0">
                        <img 
                          src={productImages[index % productImages.length]}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div className="mb-4 sm:mb-0">
                            <h3 className="font-semibold text-royal-red text-base sm:text-lg mb-2 line-clamp-1">
                              {item.name}
                            </h3>
                            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-royal-brown/70">
                              <span>Size: <strong>{item.size}</strong></span>
                              <span>Color: <strong>{item.color}</strong></span>
                            </div>
                            <div className="flex items-center mt-2 space-x-2">
                              <span className="font-bold text-royal-red text-base sm:text-lg">
                                ₹{item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && (
                                <span className="text-royal-brown/50 text-xs sm:text-sm line-through">
                                  ₹{item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 sm:gap-4">
                            <div className="flex items-center border border-royal-brown/20 rounded-lg">
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                                    navigator.vibrate(50);
                                  }
                                  updateQuantity(item.id, item.quantity - 1);
                                }}
                                className="p-1.5 sm:p-2 hover:bg-royal-cream/50 transition-colors duration-300"
                              >
                                <Minus size={14} className="sm:w-4 sm:h-4" />
                              </motion.button>
                              <span className="px-3 sm:px-4 py-1.5 sm:py-2 font-semibold text-royal-red text-sm sm:text-base">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                                    navigator.vibrate(50);
                                  }
                                  updateQuantity(item.id, item.quantity + 1);
                                }}
                                className="p-1.5 sm:p-2 hover:bg-royal-cream/50 transition-colors duration-300"
                              >
                                <Plus size={14} className="sm:w-4 sm:h-4" />
                              </motion.button>
                            </div>

                            <div className="flex gap-1 sm:gap-2">
                              <motion.button 
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                                    navigator.vibrate(50);
                                  }
                                }}
                                className="p-1.5 sm:p-2 text-royal-brown hover:text-royal-red transition-colors duration-300"
                              >
                                <Heart size={16} className="sm:w-5 sm:h-5" />
                              </motion.button>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                                    navigator.vibrate(50);
                                  }
                                  removeItem(item.id);
                                }}
                                className="p-1.5 sm:p-2 text-royal-brown hover:text-red-500 transition-colors duration-300"
                              >
                                <Trash2 size={16} className="sm:w-5 sm:h-5" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg sticky top-4 sm:top-8"
            >
              <h2 className="font-royal text-xl sm:text-2xl font-bold text-royal-red mb-4 sm:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-royal-brown/70">Subtotal</span>
                  <span className="font-semibold text-royal-red">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600 text-sm sm:text-base">
                    <span>You Save</span>
                    <span className="font-semibold">
                      -₹{savings.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-royal-brown/70">Shipping</span>
                  <span className="font-semibold text-royal-red">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="text-xs sm:text-sm text-royal-brown/60 bg-royal-cream/30 p-2 sm:p-3 rounded-lg">
                    Add ₹{(5000 - subtotal).toLocaleString()} more for free shipping
                  </div>
                )}

                <div className="border-t border-royal-brown/20 pt-3 sm:pt-4">
                  <div className="flex justify-between text-base sm:text-lg font-bold">
                    <span className="text-royal-red">Total</span>
                    <span className="text-royal-red">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                  href="/checkout"
                  onClick={() => {
                    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                      navigator.vibrate(50);
                    }
                  }}
                  className="w-full btn-primary text-center block mb-3 sm:mb-4 py-3 sm:py-4 text-sm sm:text-base"
                >
                  Proceed to Checkout
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                  href="/"
                  onClick={() => {
                    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                      navigator.vibrate(50);
                    }
                  }}
                  className="w-full btn-secondary text-center block mb-3 sm:mb-4 py-3 sm:py-4 text-sm sm:text-base"
                >
                  Back to Shopping
                </Link>
              </motion.div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 text-sm text-royal-brown/60">
                  <span>🔒 Secure Checkout</span>
                  <span>📦 Free Returns</span>
                </div>
              </div>

              
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;