"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types";
import type { ProductFormData } from "@/types/admin";
import { getFirebaseApp } from "@/lib/firebase";
import { formToCatalogProduct, subscribeToProductForms } from "@/services/products";

interface ProductContextValue {
  products: Product[];
  productForms: Record<string, ProductFormData>;
  isLoading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productForms, setProductForms] = useState<Record<string, ProductFormData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Firebase first
    try {
      getFirebaseApp();
    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
      setIsLoading(false);
      setError("Failed to initialize Firebase. Please check your configuration.");
      return;
    }

    // Subscribe to real-time updates from Firestore
    const unsubscribe = subscribeToProductForms(
      (forms) => {
        console.log("ProductContext: Received products from Firestore:", forms.length);
        setIsLoading(false);
        setError(null);

        const mappedForms: Record<string, ProductFormData> = {};
        const catalogProducts: Product[] = [];

        forms.forEach((form) => {
          if (!form.basicInfo.productId) {
            return;
          }
          mappedForms[form.basicInfo.productId] = form;
          const catalogProduct = formToCatalogProduct(form);
          if (catalogProduct.id) {
            catalogProducts.push(catalogProduct);
          }
        });

        console.log("ProductContext: Processed products:", catalogProducts.length);
        setProductForms(mappedForms);
        setProducts(catalogProducts);
      },
      (subscriptionError) => {
        console.error("ProductContext: Subscription error:", subscriptionError);
        setIsLoading(false);
        setError(subscriptionError.message || "Failed to sync products from Firestore.");
      },
    );

    return () => unsubscribe();
  }, []);

  const value = useMemo<ProductContextValue>(
    () => ({ products, productForms, isLoading, error }),
    [products, productForms, isLoading, error],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  return context;
};


