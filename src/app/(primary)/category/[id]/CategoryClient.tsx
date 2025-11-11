'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Scale, ArrowLeft } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { useCompare } from '@/contexts/CompareContext';
import CompareProducts from '@/components/CompareProducts';
import { formatCategoryLabel, normalizeCategoryId } from '@/utils/category';
import type { Product } from '@/types';

interface CategoryClientProps {
  params: {
    id: string;
  };
}

const CategoryClient = ({ params }: CategoryClientProps) => {
  const [sortBy, setSortBy] = useState('featured');
  const [showCompare, setShowCompare] = useState(false);

  const { products: catalogProducts, isLoading } = useProducts();
  const { compareCount } = useCompare();

  const decodedParam = useMemo(() => decodeURIComponent(params.id), [params.id]);
  const categoryKey = useMemo(
    () => normalizeCategoryId(decodedParam),
    [decodedParam],
  );

  const categoryProducts = useMemo(
    () =>
      catalogProducts.filter(
        (product) => normalizeCategoryId(product.category ?? '') === categoryKey,
      ),
    [catalogProducts, categoryKey],
  );

  const categoryName = formatCategoryLabel(
    categoryProducts[0]?.category ?? decodedParam,
  );
  const categoryDescription =
    categoryProducts[0]?.description ||
    `Explore curated ${categoryName.toLowerCase()} from Koshak.`;

  const sortedProducts = useMemo(() => {
    return [...categoryProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [categoryProducts, sortBy]);

  const hapticFeedback = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

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
            href="/"
            className="inline-flex items-center text-royal-brown hover:text-royal-red transition-colors duration-300"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
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
            {categoryName}
          </h1>
          <p className="text-royal-brown/80 text-lg mb-6">
            {categoryDescription}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-royal-brown/70">
              {isLoading
                ? 'Loading products…'
                : `${sortedProducts.length} product${sortedProducts.length === 1 ? '' : 's'} found`}
            </p>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
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
          {(isLoading ? Array.from({ length: 8 }) : sortedProducts).map((maybeProduct, index) => {
            if (isLoading) {
              return (
                <div
                  key={`category-skeleton-${index}`}
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

        {!isLoading && sortedProducts.length === 0 && (
          <div className="mt-12 rounded-2xl border border-royal-brown/20 bg-white/60 p-8 text-center">
            <p className="font-royal text-xl text-royal-red mb-2">
              New styles coming soon
            </p>
            <p className="text-royal-brown/70">
              We&apos;re crafting fresh pieces for {categoryName.toLowerCase()}. Check back shortly!
            </p>
          </div>
        )}

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