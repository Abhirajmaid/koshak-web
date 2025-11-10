"use client";

import { formToCatalogProduct } from "@/services/products";
import type { ProductFormData } from "@/types/admin";

interface ViewProductModalProps {
  product: ProductFormData;
  onClose: () => void;
}

export const ViewProductModal = ({ product, onClose }: ViewProductModalProps) => {
  const catalogProduct = formToCatalogProduct(product);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-950 via-black to-neutral-900">
        {/* Header */}
        <div className="sticky top-0 border-b border-white/10 bg-black/80 backdrop-blur p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Product Preview</h2>
            <button
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Image */}
          {catalogProduct.image && (
            <div className="aspect-square w-full overflow-hidden rounded-xl">
              <img
                src={catalogProduct.image}
                alt={catalogProduct.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{catalogProduct.name}</h1>
              <p className="mt-2 text-sm text-white/60">ID: {product.basicInfo.productId}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-white">
                ₹{catalogProduct.price.toLocaleString()}
              </span>
              {catalogProduct.originalPrice && (
                <span className="text-lg text-white/50 line-through">
                  ₹{catalogProduct.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">Category</p>
                <p className="mt-1 text-white">{catalogProduct.category}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">Status</p>
                <p className="mt-1 text-white capitalize">{product.basicInfo.status}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">Stock</p>
                <p className="mt-1 text-white">{product.pricing.stockQuantity} units</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">Stock Status</p>
                <p className="mt-1 text-white capitalize">{product.pricing.stockStatus}</p>
              </div>
            </div>

            {/* Description */}
            {catalogProduct.description && (
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white/60">Description</p>
                <p className="mt-2 text-white">{catalogProduct.description}</p>
              </div>
            )}

            {/* Detailed Description */}
            {catalogProduct.detailedDescription && (
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white/60">Detailed Description</p>
                <p className="mt-2 whitespace-pre-wrap text-white">
                  {catalogProduct.detailedDescription}
                </p>
              </div>
            )}

            {/* Sizes & Colors */}
            {(catalogProduct.sizes.length > 0 || catalogProduct.colors.length > 0) && (
              <div className="grid gap-4 md:grid-cols-2">
                {catalogProduct.sizes.length > 0 && (
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-medium text-white/60">Available Sizes</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {catalogProduct.sizes.map((size) => (
                        <span
                          key={size}
                          className="rounded-full bg-white/10 px-3 py-1 text-sm text-white"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {catalogProduct.colors.length > 0 && (
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-medium text-white/60">Available Colors</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {catalogProduct.colors.map((color) => (
                        <span
                          key={color}
                          className="rounded-full bg-white/10 px-3 py-1 text-sm text-white"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Features */}
            {catalogProduct.features && catalogProduct.features.length > 0 && (
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white/60">Features</p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-white">
                  {catalogProduct.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


