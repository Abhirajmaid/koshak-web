'use client';

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product } from '@/types';
import { useProducts } from '@/contexts/ProductContext';

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

const getInitialCompareIds = (): string[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const saved = localStorage.getItem('compareList');
  if (!saved) {
    return [];
  }
  try {
    return JSON.parse(saved) as string[];
  } catch (error) {
    console.error('Error parsing compare list from storage:', error);
    localStorage.removeItem('compareList');
    return [];
  }
};

export const CompareProvider = ({ children }: CompareProviderProps) => {
  const [compareIds, setCompareIds] = useState<string[]>(getInitialCompareIds);
  const { products: catalogProducts } = useProducts();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('compareList', JSON.stringify(compareIds));
    }
  }, [compareIds]);

  const compareList = useMemo(
    () => catalogProducts.filter((product) => compareIds.includes(product.id)).slice(0, 3),
    [catalogProducts, compareIds],
  );

  const addToCompare = (product: Product): boolean => {
    if (compareIds.length >= 3) {
      return false; // Maximum 3 products can be compared
    }

    if (compareIds.includes(product.id)) {
      return false; // Product already in compare list
    }

    setCompareIds((prev) => [...prev, product.id]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareIds((prev) => prev.filter((id) => id !== productId));
  };

  const clearCompare = () => {
    setCompareIds([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('compareList');
    }
  };

  const isInCompare = (productId: string): boolean => {
    return compareIds.includes(productId);
  };

  const value: CompareContextType = {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    compareCount: compareIds.length,
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
};