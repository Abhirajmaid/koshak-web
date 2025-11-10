"use client";

import { useState } from "react";
import { uploadProductImage } from "@/services/storage";

interface ImageUploadProps {
  label: string;
  currentUrl: string;
  onUploadComplete: (url: string) => void;
  productId: string;
  imageType: "primary" | "hover" | "gallery" | "lifestyle" | "variant";
  disabled?: boolean;
}

export const ImageUpload = ({
  label,
  currentUrl,
  onUploadComplete,
  productId,
  imageType,
  disabled = false,
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (jpg, png, etc.)");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Firebase Storage
      const url = await uploadProductImage(file, productId || "temp", imageType);
      onUploadComplete(url);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload image");
      setPreview(currentUrl || null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white/70">{label}</label>
      
      <div className="flex flex-col gap-3">
        {/* Preview */}
        {preview && (
          <div className="relative w-full max-w-xs">
            <img
              src={preview}
              alt="Preview"
              className="h-32 w-full rounded-lg border border-white/10 object-cover"
            />
            {currentUrl && currentUrl !== preview && (
              <div className="absolute top-2 right-2 rounded-full bg-emerald-500/80 px-2 py-1 text-xs text-white">
                New
              </div>
            )}
          </div>
        )}

        {/* File Input */}
        <div className="flex items-center gap-3">
          <label
            className={`flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm text-white transition hover:bg-black/50 ${
              disabled || uploading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {uploading ? "Uploading..." : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={disabled || uploading}
              className="hidden"
            />
          </label>

          {/* URL Input (fallback) */}
          <input
            type="text"
            value={currentUrl}
            onChange={(e) => onUploadComplete(e.target.value)}
            placeholder="Or enter image URL"
            className="flex-1 rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
            style={{ color: "white" }}
          />
        </div>

        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}

        {uploading && (
          <div className="flex items-center gap-2 text-xs text-white/60">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
            Uploading image...
          </div>
        )}
      </div>
    </div>
  );
};


