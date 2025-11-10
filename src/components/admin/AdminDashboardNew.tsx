"use client";

import { useState, useEffect } from "react";
import { getFirebaseApp } from "@/lib/firebase";
import { subscribeToProductForms, removeProductForm } from "@/services/products";
import type { ProductFormData } from "@/types/admin";
import { AdminSidebar } from "./AdminSidebar";
import { AdminDashboardView } from "./AdminDashboardView";
import { AdminProductsView } from "./AdminProductsView";
import { ViewProductModal } from "./ViewProductModal";
import { DeleteProductModal } from "./DeleteProductModal";
import { ModifyProductPage } from "./ModifyProductPage";

type AdminView = "dashboard" | "products" | "modify" | "view" | "delete";

interface AdminDashboardNewProps {
  adminEmail: string;
  onSignOut: () => void;
}

export const AdminDashboardNew = ({
  adminEmail,
  onSignOut,
}: AdminDashboardNewProps) => {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [products, setProducts] = useState<Record<string, ProductFormData>>({});
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Real-time subscription to Firebase
  useEffect(() => {
    getFirebaseApp();
    setIsLoading(true);
    setErrorMessage(null);

    const unsubscribe = subscribeToProductForms(
      (forms) => {
        setIsLoading(false);
        setErrorMessage(null);

        const mapped: Record<string, ProductFormData> = {};
        forms.forEach((form) => {
          if (form.basicInfo.productId) {
            mapped[form.basicInfo.productId] = form;
          }
        });
        setProducts(mapped);
      },
      (error) => {
        console.error("Failed to sync products from Firestore", error);
        setIsLoading(false);
        setErrorMessage("Failed to sync products from Firestore. Please refresh the page.");
      },
    );

    return () => unsubscribe();
  }, []);

  const handleViewProduct = (productId: string) => {
    const product = products[productId];
    if (!product) {
      return;
    }

    const handle = product.basicInfo.slug?.trim() || product.basicInfo.productId?.trim();
    if (!handle) {
      return;
    }

    const url = `/product/${encodeURIComponent(handle)}?productId=${encodeURIComponent(product.basicInfo.productId)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleModifyProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView("modify");
  };

  const handleDeleteProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView("delete");
  };

  const handleAddNew = () => {
    setSelectedProductId(null);
    setCurrentView("modify");
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProductId) return;
    await removeProductForm(selectedProductId);
    setCurrentView("products");
    setSelectedProductId(null);
  };

  const handleModifySave = () => {
    setCurrentView("products");
    setSelectedProductId(null);
  };

  const handleModifyCancel = () => {
    setCurrentView("products");
    setSelectedProductId(null);
  };

  const selectedProduct = selectedProductId ? products[selectedProductId] : null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={currentView === "dashboard" ? "dashboard" : "products"}
        onSectionChange={(section) => {
          setCurrentView(section);
          setSelectedProductId(null);
        }}
        adminEmail={adminEmail}
        onSignOut={onSignOut}
      />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Right-aligned dynamic title */}
        <div className="mb-6 flex justify-end">
          <h1 className="text-2xl font-semibold text-white">
            {currentView === "dashboard" ? "Dashboard" : "Products"}
          </h1>
        </div>
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {errorMessage}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-white/60">Loading products from Firestore...</div>
          </div>
        ) : (
          <>
            {currentView === "dashboard" && (
              <AdminDashboardView products={products} />
            )}

            {currentView === "products" && (
              <AdminProductsView
                products={products}
                onView={handleViewProduct}
                onModify={handleModifyProduct}
                onDelete={handleDeleteProduct}
                onAddNew={handleAddNew}
              />
            )}

            {currentView === "modify" && (
              <ModifyProductPage
                productId={selectedProductId}
                initialProduct={selectedProduct}
                adminEmail={adminEmail}
                onSave={handleModifySave}
                onCancel={handleModifyCancel}
              />
            )}

            {currentView === "view" && selectedProduct && (
              <ViewProductModal
                product={selectedProduct}
                onClose={() => {
                  setCurrentView("products");
                  setSelectedProductId(null);
                }}
              />
            )}

            {currentView === "delete" && selectedProduct && (
              <DeleteProductModal
                product={selectedProduct}
                onConfirm={handleDeleteConfirm}
                onClose={() => {
                  setCurrentView("products");
                  setSelectedProductId(null);
                }}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};


