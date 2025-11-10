"use client";

import { useState, useMemo } from "react";
import type { ProductFormData } from "@/types/admin";

interface AdminProductsViewProps {
  products: Record<string, ProductFormData>;
  onView: (productId: string) => void;
  onModify: (productId: string) => void;
  onDelete: (productId: string) => void;
  onAddNew: () => void;
}

export const AdminProductsView = ({
  products,
  onView,
  onModify,
  onDelete,
  onAddNew,
}: AdminProductsViewProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = new Set<string>();
    Object.values(products).forEach((p) => {
      if (p.basicInfo.category) {
        cats.add(p.basicInfo.category);
      }
    });
    return Array.from(cats).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return Object.values(products).filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.basicInfo.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.basicInfo.productId
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || product.basicInfo.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        product.basicInfo.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [products, searchQuery, statusFilter, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Header with Search, Filters, and Add Button */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
              style={{ color: "white" }}
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
            style={{ color: "white" }}
          >
            <option value="all" className="bg-neutral-900">
              All Status
            </option>
            <option value="active" className="bg-neutral-900">
              Active
            </option>
            <option value="inactive" className="bg-neutral-900">
              Inactive
            </option>
            <option value="draft" className="bg-neutral-900">
              Draft
            </option>
            <option value="out-of-stock" className="bg-neutral-900">
              Out of Stock
            </option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
            style={{ color: "white" }}
          >
            <option value="all" className="bg-neutral-900">
              All Categories
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-neutral-900">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Add Entry Button */}
        <button
          onClick={onAddNew}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-white/90"
        >
          + Add Entry
        </button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/60">
                Product ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/60">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/60">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/60">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/60">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/60">
                Stock
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-white/60">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-black/20">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-sm text-white/50">
                  No products found. {Object.keys(products).length === 0 ? "Create your first product!" : "Try adjusting your filters."}
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.basicInfo.productId} className="hover:bg-white/5">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                    {product.basicInfo.productId}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {product.basicInfo.name || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-white/70">
                    {product.basicInfo.category || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        product.basicInfo.status === "active"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : product.basicInfo.status === "inactive"
                            ? "bg-neutral-500/20 text-neutral-400"
                            : product.basicInfo.status === "draft"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {product.basicInfo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    ₹{product.pricing.basePrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {product.pricing.stockQuantity}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onView(product.basicInfo.productId)}
                        className="rounded-lg border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs text-blue-400 transition hover:bg-blue-500/20"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onModify(product.basicInfo.productId)}
                        className="rounded-lg border border-yellow-400/40 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400 transition hover:bg-yellow-500/20"
                      >
                        Modify
                      </button>
                      <button
                        onClick={() => onDelete(product.basicInfo.productId)}
                        className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-1 text-xs text-red-400 transition hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Results Count */}
      <div className="text-sm text-white/50">
        Showing {filteredProducts.length} of {Object.keys(products).length} products
      </div>
    </div>
  );
};


