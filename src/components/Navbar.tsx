'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, Heart, User } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { buildCategoryOptions } from '@/utils/category';

const hapticFeedback = () => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(50);
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { products } = useProducts();

  useEffect(() => {
    const calculateCartCount = () => {
      try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
        if (!raw) {
          setCartCount(0);
          return;
        }
        const items = JSON.parse(raw) as Array<{ quantity?: number }>;
        const totalQuantity = items.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
        setCartCount(totalQuantity);
      } catch {
        setCartCount(0);
      }
    };

    // Initial load
    calculateCartCount();

    // Update on storage changes (cross-tab) and custom cart updates (same-tab)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'cart') {
        calculateCartCount();
      }
    };
    const handleCartUpdated = () => calculateCartCount();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('cart-updated', handleCartUpdated as EventListener);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('cart-updated', handleCartUpdated as EventListener);
    };
  }, []);

  const categoryLinks = useMemo(
    () => buildCategoryOptions(products).slice(0, 3),
    [products],
  );

  const navItems = useMemo(
    () => [
      { name: 'Home', href: '/' },
      ...categoryLinks.map((category) => ({
        name: category.label,
        href: `/category/${encodeURIComponent(category.key)}`,
      })),
      { name: 'About', href: '/about' },
    ],
    [categoryLinks],
  );

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-royal-cream via-white to-white border-b-2 border-royal-gold/30 shadow-md">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-royal-red via-royal-gold to-royal-red"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 sm:space-x-3 group" 
            onClick={hapticFeedback}
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-royal-red via-royal-maroon to-royal-red rounded-full flex items-center justify-center shadow-lg ring-2 ring-royal-gold/30">
                <span className="text-royal-gold font-bold text-xl sm:text-2xl">क</span>
              </div>
              <div className="absolute -inset-1 bg-royal-gold/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-royal-red to-royal-maroon bg-clip-text text-transparent">
                Koshak
              </span>
              <span className="text-[10px] sm:text-xs text-royal-brown/70 -mt-1 font-medium">
                Traditional Elegance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative px-4 py-2 mx-1 text-royal-brown font-medium text-sm sm:text-base transition-all duration-300 group"
                  onClick={hapticFeedback}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-royal-gold/20 to-royal-red/20 rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Bottom border on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-royal-gold to-royal-red"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search - Hidden on mobile */}
            <motion.button 
              type="button"
              title="Search"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={hapticFeedback}
              className="hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300 rounded-full bg-royal-cream/50 hover:bg-royal-gold/20 border border-royal-brown/20 hover:border-royal-gold/50 shadow-sm"
            >
              <Search size={18} className="sm:w-5 sm:h-5" />
            </motion.button>

            {/* Wishlist - Hidden on mobile */}
            <motion.button 
              type="button"
              title="Wishlist"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={hapticFeedback}
              className="hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300 rounded-full bg-royal-cream/50 hover:bg-royal-gold/20 border border-royal-brown/20 hover:border-royal-gold/50 shadow-sm"
            >
              <Heart size={18} className="sm:w-5 sm:h-5" />
            </motion.button>

            {/* Account */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/account"
                onClick={hapticFeedback}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300 rounded-full bg-royal-cream/50 hover:bg-royal-gold/20 border border-royal-brown/20 hover:border-royal-gold/50 shadow-sm"
              >
                <User size={18} className="sm:w-5 sm:h-5" />
              </Link>
            </motion.div>

            {/* Cart */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/cart" 
                onClick={hapticFeedback} 
                className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300 rounded-full bg-royal-cream/50 hover:bg-royal-gold/20 border border-royal-brown/20 hover:border-royal-gold/50 shadow-sm"
              >
                <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-br from-royal-red to-royal-maroon text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-lg ring-2 ring-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              type="button"
              title="Menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                hapticFeedback();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300 rounded-full bg-royal-cream/50 hover:bg-royal-gold/20 border border-royal-brown/20 hover:border-royal-gold/50 shadow-sm"
            >
              {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gradient-to-b from-white to-royal-cream/30 border-t-2 border-royal-gold/30 shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      hapticFeedback();
                      setIsMenuOpen(false);
                    }}
                    className="block py-3 px-4 text-royal-brown hover:text-royal-red transition-all duration-300 font-medium text-base rounded-lg bg-royal-cream/50 hover:bg-gradient-to-r hover:from-royal-gold/20 hover:to-royal-red/20 border border-royal-brown/20 hover:border-royal-gold/50 shadow-sm"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile-only search and wishlist */}
              <div className="sm:hidden pt-4 border-t border-royal-gold/30 mt-4 space-y-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={hapticFeedback}
                  className="flex items-center space-x-3 w-full py-3 px-4 text-royal-brown hover:text-royal-red transition-all duration-300 font-medium text-base rounded-lg bg-royal-cream/50 hover:bg-gradient-to-r hover:from-royal-gold/20 hover:to-royal-red/20 border border-royal-brown/20 hover:border-royal-gold/50 shadow-sm"
                >
                  <Search size={18} />
                  <span>Search</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={hapticFeedback}
                  className="flex items-center space-x-3 w-full py-3 px-4 text-royal-brown hover:text-royal-red transition-all duration-300 font-medium text-base rounded-lg bg-royal-cream/50 hover:bg-gradient-to-r hover:from-royal-gold/20 hover:to-royal-red/20 border border-royal-brown/20 hover:border-royal-gold/50 shadow-sm"
                >
                  <Heart size={18} />
                  <span>Wishlist</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
