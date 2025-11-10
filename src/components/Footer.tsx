"use client";

import { useMemo } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { buildCategoryOptions } from '@/utils/category';

const Footer = () => {
  const { products } = useProducts();
  const categories = useMemo(() => buildCategoryOptions(products).slice(0, 6), [products]);

  return (
    <footer className="bg-gradient-to-br from-royal-brown to-royal-maroon text-royal-cream">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-royal-red to-royal-maroon rounded-full flex items-center justify-center border-2 border-royal-gold">
                <span className="text-royal-gold font-bold text-lg sm:text-xl">क</span>
              </div>
              <span className="font-royal text-xl sm:text-2xl font-bold text-royal-gold">
                Koshak
              </span>
            </div>
            <p className="text-royal-cream/80 text-xs sm:text-sm leading-relaxed">
              Discover the perfect blend of traditional Indian craftsmanship and contemporary style. 
              Koshak brings you premium Indo-Western clothing for every special occasion.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-royal-gold hover:text-yellow-300 transition-colors duration-300">
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-royal-gold hover:text-yellow-300 transition-colors duration-300">
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-royal-gold hover:text-yellow-300 transition-colors duration-300">
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links & Categories - Dual Column */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="font-royal text-base sm:text-lg font-semibold text-royal-gold">Quick Links</h3>
              <ul className="space-y-1.5">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About Us', href: '/about' },
                  { name: 'All Products', href: '/products' },
                  { name: 'Size Guide', href: '/size-guide' },
                  { name: 'Care Instructions', href: '/care' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-royal-cream/80 hover:text-royal-gold transition-colors duration-300 text-xs sm:text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="font-royal text-base sm:text-lg font-semibold text-royal-gold">Categories</h3>
              <ul className="space-y-1.5">
                {categories.length ? (
                  categories.map((category) => (
                    <li key={category.key}>
                      <Link 
                        href={`/category/${encodeURIComponent(category.key)}`}
                        className="text-royal-cream/80 hover:text-royal-gold transition-colors duration-300 text-xs sm:text-sm"
                      >
                        {category.label}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-royal-cream/60 text-xs sm:text-sm">
                    Categories will appear once products are added.
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-royal text-base sm:text-lg font-semibold text-royal-gold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin size={14} className="text-royal-gold mt-1 flex-shrink-0 sm:w-4 sm:h-4" />
                <p className="text-royal-cream/80 text-xs sm:text-sm">
                  123 Fashion Street, Karol Bagh<br />
                  New Delhi, India - 110005
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone size={14} className="text-royal-gold flex-shrink-0 sm:w-4 sm:h-4" />
                <p className="text-royal-cream/80 text-xs sm:text-sm">+91 98765 43210</p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail size={14} className="text-royal-gold flex-shrink-0 sm:w-4 sm:h-4" />
                <p className="text-royal-cream/80 text-xs sm:text-sm">hello@koshak.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-royal-gold/20 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-royal-cream/60 text-xs sm:text-sm text-center sm:text-left">
              © 2024 Koshak Fashion. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
              <Link href="/privacy" className="text-royal-cream/60 hover:text-royal-gold transition-colors duration-300 text-xs sm:text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-royal-cream/60 hover:text-royal-gold transition-colors duration-300 text-xs sm:text-sm">
                Terms of Service
              </Link>
              <Link href="/returns" className="text-royal-cream/60 hover:text-royal-gold transition-colors duration-300 text-xs sm:text-sm">
                Returns & Exchanges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;