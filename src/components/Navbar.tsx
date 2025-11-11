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
  const [showBar, setShowBar] = useState(false);
  const { products } = useProducts();

  // Show navbar after user scrolls a bit
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setShowBar(y > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: showBar ? 1 : 0, y: showBar ? 0 : -20 }}
      transition={{ duration: 0.4 }}
      className={`sticky top-0 z-50 ${showBar ? 'backdrop-blur-md' : 'pointer-events-none'} border-b border-white/10`}
      style={{ background: showBar ? 'rgba(255,255,255,0.06)' : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 sm:space-x-2" onClick={hapticFeedback}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-royal-red to-royal-maroon rounded-full flex items-center justify-center shadow-lg shadow-black/10">
              <span className="text-royal-gold font-bold text-lg sm:text-xl">क</span>
            </div>
            <span className="font-royal text-xl sm:text-2xl md:text-3xl font-bold text-royal-red">
              Koshak
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-royal-brown/90 hover:text-royal-red transition-colors duration-300 font-medium relative group rounded-full px-3 py-1.5 border border-white/10 bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-sm shadow-black/10"
              >
                {item.name}
                <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-royal-gold group-hover:w-3/4 transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-3">
            {/* Search - Hidden on mobile */}
            <motion.button 
              type="button"
              title="Search"
              whileTap={{ scale: 0.95 }}
              onClick={hapticFeedback}
              className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300 rounded-full border border-white/10 bg-white/10 hover:bg-white/20 backdrop-blur"
            >
              <Search size={18} className="sm:w-5 sm:h-5" />
            </motion.button>

            {/* Wishlist - Hidden on mobile */}
            <motion.button 
              type="button"
              title="Wishlist"
              whileTap={{ scale: 0.95 }}
              onClick={hapticFeedback}
              className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300 rounded-full border border-white/10 bg-white/10 hover:bg-white/20 backdrop-blur"
            >
              <Heart size={18} className="sm:w-5 sm:h-5" />
            </motion.button>

            {/* Account */}
            <Link
              href="/account"
              onClick={hapticFeedback}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300 rounded-full border border-white/10 bg-white/10 hover:bg-white/20 backdrop-blur"
            >
              <User size={18} className="sm:w-5 sm:h-5" />
            </Link>

            {/* Cart */}
            <Link 
              href="/cart" 
              onClick={hapticFeedback} 
              className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300 rounded-full border border-white/10 bg-white/10 hover:bg-white/20 backdrop-blur"
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
              className="lg:hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-royal-brown hover:text-royal-red transition-colors duration-300 rounded-full border border-white/10 bg-white/10 hover:bg-white/20 backdrop-blur"
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
            className="lg:hidden border-t border-white/10 backdrop-blur-md"
            style={{ background: 'rgba(255,255,255,0.06)' }}
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
                    className="block py-3 px-3 text-royal-brown/90 hover:text-royal-red transition-colors duration-300 font-medium text-base rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 backdrop-blur"
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
                  className="flex items-center space-x-3 w-full py-3 px-3 text-royal-brown/90 hover:text-royal-red transition-colors duration-300 font-medium text-base rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 backdrop-blur"
                >
                  <Search size={18} />
                  <span>Search</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={hapticFeedback}
                  className="flex items-center space-x-3 w-full py-3 px-3 text-royal-brown/90 hover:text-royal-red transition-colors duration-300 font-medium text-base rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 backdrop-blur"
                >
                  <Heart size={18} />
                  <span>Wishlist</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;