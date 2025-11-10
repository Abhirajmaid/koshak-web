"use client";

import { useState } from "react";
import type { ProductFormData } from "@/types/admin";

interface DeleteProductModalProps {
  product: ProductFormData;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export const DeleteProductModal = ({
  product,
  onConfirm,
  onClose,
}: DeleteProductModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      console.error("Failed to delete product:", err);
      setError("Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-950 via-black to-neutral-900 p-6">
        <h2 className="text-2xl font-bold text-white">Delete Product</h2>
        <p className="mt-4 text-white/70">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>

        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-white/60">Product ID</p>
          <p className="mt-1 font-medium text-white">{product.basicInfo.productId}</p>
          <p className="mt-2 text-sm text-white/60">Product Name</p>
          <p className="mt-1 font-medium text-white">
            {product.basicInfo.name || "—"}
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 rounded-lg border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Product"}
          </button>
        </div>
      </div>
    </div>
  );
};


