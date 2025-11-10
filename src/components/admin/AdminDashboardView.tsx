"use client";

import { useMemo, useEffect, useState } from "react";
import type { ProductFormData } from "@/types/admin";
import { subscribeToWebsiteAnalytics, type WebsiteAnalytics } from "@/services/analytics";

interface AdminDashboardViewProps {
  products: Record<string, ProductFormData>;
}

export const AdminDashboardView = ({ products }: AdminDashboardViewProps) => {
  const [analytics, setAnalytics] = useState<WebsiteAnalytics>({
    totalViews: 0,
    clickThroughRate: 0,
    conversionRate: 0,
    totalClicks: 0,
    totalConversions: 0,
    lastUpdated: new Date().toISOString(),
  });

  useEffect(() => {
    const unsubscribe = subscribeToWebsiteAnalytics(
      (data) => {
        setAnalytics(data);
      },
      (error) => {
        console.error("Error loading analytics:", error);
      }
    );

    return () => unsubscribe();
  }, []);
  const stats = useMemo(() => {
    const productList = Object.values(products);
    const activeProducts = productList.filter(
      (p) => p.basicInfo.status === "active"
    ).length;
    const totalProducts = productList.length;
    const inStockProducts = productList.filter(
      (p) => p.pricing.stockStatus === "in-stock"
    ).length;
    const featuredProducts = productList.filter((p) => p.seo.featured).length;

    return {
      totalProducts,
      activeProducts,
      inStockProducts,
      featuredProducts,
    };
  }, [products]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Products</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {stats.totalProducts}
              </p>
            </div>
            <div className="rounded-full bg-white/10 p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Active Products</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {stats.activeProducts}
              </p>
            </div>
            <div className="rounded-full bg-white/10 p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">In Stock</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {stats.inStockProducts}
              </p>
            </div>
            <div className="rounded-full bg-white/10 p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Featured</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {stats.featuredProducts}
              </p>
            </div>
            <div className="rounded-full bg-white/10 p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      

      {/* Recent Activity */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Recent Activity</h2>
        <div className="space-y-3">
          {Object.values(products)
            .slice(0, 5)
            .map((product) => (
              <div
                key={product.basicInfo.productId}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {product.basicInfo.name || product.basicInfo.productId}
                  </p>
                  <p className="text-xs text-white/50">
                    Last modified: {product.admin.lastModifiedDate
                      ? new Date(product.admin.lastModifiedDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    product.basicInfo.status === "active"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-neutral-500/20 text-neutral-400"
                  }`}
                >
                  {product.basicInfo.status}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

