'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, Heart, User } from 'lucide-react';

const hapticFeedback = () => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(50);
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Kurtas', href: '/category/kurtas' },
    { name: 'Lehengas', href: '/category/lehengas' },
    { name: 'Sarees', href: '/category/sarees' },
    { name: 'Sherwanis', href: '/category/sherwanis' },
    { name: 'Indo-Western', href: '/category/indo-western' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-royal-gold/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 sm:space-x-2" onClick={hapticFeedback}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-royal-red to-royal-maroon rounded-full flex items-center justify-center">
              <span className="text-royal-gold font-bold text-lg sm:text-xl">क</span>
            </div>
            <span className="font-royal text-xl sm:text-2xl md:text-3xl font-bold text-royal-red">
              Koshak
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-royal-brown hover:text-royal-red transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-royal-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            {/* Search - Hidden on mobile */}
            <motion.button 
              type="button"
              title="Search"
              whileTap={{ scale: 0.95 }}
              onClick={hapticFeedback}
              className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300"
            >
              <Search size={18} className="sm:w-5 sm:h-5" />
            </motion.button>

            {/* Wishlist - Hidden on mobile */}
            <motion.button 
              type="button"
              title="Wishlist"
              whileTap={{ scale: 0.95 }}
              onClick={hapticFeedback}
              className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300"
            >
              <Heart size={18} className="sm:w-5 sm:h-5" />
            </motion.button>

            {/* Account */}
            <Link
              href="/account"
              onClick={hapticFeedback}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300"
            >
              <User size={18} className="sm:w-5 sm:h-5" />
            </Link>

            {/* Cart */}
            <Link 
              href="/cart" 
              onClick={hapticFeedback} 
              className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300"
            >
              <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-royal-red text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <motion.button
              type="button"
              title="Menu"
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                hapticFeedback();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="lg:hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300"
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
            className="lg:hidden bg-white border-t border-royal-gold/20"
          >
            <div className="px-3 sm:px-4 py-4 space-y-2">
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
                    className="block py-3 px-2 text-royal-brown hover:text-royal-red transition-colors duration-300 font-medium text-base rounded-lg hover:bg-royal-gold/10"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile-only search and wishlist */}
              <div className="sm:hidden pt-4 border-t border-royal-gold/20 mt-4">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={hapticFeedback}
                  className="flex items-center space-x-3 w-full py-3 px-2 text-royal-brown hover:text-royal-red transition-colors duration-300 font-medium text-base rounded-lg hover:bg-royal-gold/10"
                >
                  <Search size={18} />
                  <span>Search</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={hapticFeedback}
                  className="flex items-center space-x-3 w-full py-3 px-2 text-royal-brown hover:text-royal-red transition-colors duration-300 font-medium text-base rounded-lg hover:bg-royal-gold/10"
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