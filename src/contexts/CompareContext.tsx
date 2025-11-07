'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';
import { products } from '@/data/products';

interface CompareContextType {
  compareList: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  compareCount: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

interface CompareProviderProps {
  children: ReactNode;
}

export const CompareProvider = ({ children }: CompareProviderProps) => {
  const [compareList, setCompareList] = useState<Product[]>([]);

  useEffect(() => {
    // Load compare list from localStorage on mount
    const saved = localStorage.getItem('compareList');
    if (saved) {
      try {
        const productIds = JSON.parse(saved);
        const savedProducts = products.filter(p => productIds.includes(p.id));
        setCompareList(savedProducts);
      } catch (error) {
        console.error('Error loading compare list:', error);
        localStorage.removeItem('compareList');
      }
    }
  }, []);

  const addToCompare = (product: Product): boolean => {
    if (compareList.length >= 3) {
      return false; // Maximum 3 products can be compared
    }
    
    if (compareList.some(p => p.id === product.id)) {
      return false; // Product already in compare list
    }

    const newCompareList = [...compareList, product];
    setCompareList(newCompareList);
    localStorage.setItem('compareList', JSON.stringify(newCompareList.map(p => p.id)));
    return true;
  };

  const removeFromCompare = (productId: string) => {
    const newCompareList = compareList.filter(p => p.id !== productId);
    setCompareList(newCompareList);
    localStorage.setItem('compareList', JSON.stringify(newCompareList.map(p => p.id)));
  };

  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem('compareList');
  };

  const isInCompare = (productId: string): boolean => {
    return compareList.some(p => p.id === productId);
  };

  const value: CompareContextType = {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    compareCount: compareList.length,
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
};