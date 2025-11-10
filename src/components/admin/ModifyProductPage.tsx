"use client";

import { useEffect, useId, useState } from "react";
import { upsertProductForm, computeProductHandle } from "@/services/products";
import {
  defaultProductFormData,
  type ProductFormData,
  type VariantData,
} from "@/types/admin";
import { ImageUpload } from "./ImageUpload";

// Import form components from the original AdminDashboard
const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
    <header className="mb-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description ? (
        <p className="mt-1 text-sm text-white/50">{description}</p>
      ) : null}
    </header>
    <div className="grid gap-4 text-white">{children}</div>
  </section>
);

const Label = ({ label }: { label: string }) => (
  <label className="text-sm font-medium text-white/70">{label}</label>
);

const DEFAULT_CATEGORY_OPTIONS = [
  "T-Shirts",
  "Oversized T-Shirts",
  "Track Pants",
  "Hoodies",
  "Oversized Hoodies",
  "Shirts",
  "Casual Shirts",
  "Suits",
  "Pyjamas",
  "Footwear",
  "Kurta Sets",
  "Sherwanis",
  "Blazers",
  "Sweatshirts",
  "Joggers",
  "Denim Jackets",
  "Ethnic Wear",
  "Jeans",
  "Nehru Jackets",
  "Athleisure Sets",
];

const normalizeCategory = (value: string) => value.trim().toLowerCase();

const TextInput = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number" | "email" | "date";
  placeholder?: string;
  disabled?: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <Label label={label} />
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-60"
      placeholder={placeholder}
      style={{ color: "white" }}
    />
  </div>
);

const TextAreaInput = ({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) => (
  <div className="flex flex-col gap-2">
    <Label label={label} />
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
      style={{ color: "white" }}
    />
  </div>
);

const ToggleInput = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) => (
  <label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white">
    <span>{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      className="h-5 w-5 rounded border-white/20 bg-transparent accent-white"
    />
  </label>
);

const SelectInput = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div className="flex flex-col gap-2">
    <Label label={label} />
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
      style={{ color: "white" }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-neutral-900">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const CategoryInput = ({
  label,
  value,
  onChange,
  onCommit,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onCommit: (value: string) => void;
  options: string[];
  placeholder?: string;
}) => {
  const datalistId = useId();

  const handleCommit = (val: string) => {
    if (!val.trim()) return;
    onCommit(val);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label label={label} />
      <input
        list={datalistId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={(event) => handleCommit(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            handleCommit(event.currentTarget.value);
          }
        }}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
        style={{ color: "white" }}
      />
      <datalist id={datalistId}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </div>
  );
};

const parseList = (value: string) =>
  value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

const formatList = (values: string[]) => values.join(", ");

interface ModifyProductPageProps {
  productId: string | null;
  initialProduct: ProductFormData | null;
  adminEmail: string;
  onSave: () => void;
  onCancel: () => void;
}

export const ModifyProductPage = ({
  productId,
  initialProduct,
  adminEmail,
  onSave,
  onCancel,
}: ModifyProductPageProps) => {
  const buildDefaultForm = () => {
    const base = defaultProductFormData();
    base.admin.addedBy = adminEmail;
    base.admin.lastModifiedBy = adminEmail;
    return base;
  };

  const [formData, setFormData] = useState<ProductFormData>(
    initialProduct || buildDefaultForm()
  );
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [variantForm, setVariantForm] = useState({
    color: "Black",
    size: "M",
    priceAdjustment: 0,
    stock: 0,
    image: "",
    available: true,
    sku: "",
  });

  const [categoryOptions, setCategoryOptions] = useState<string[]>(() => {
    const base = [...DEFAULT_CATEGORY_OPTIONS];
    const initialCategory = initialProduct?.basicInfo.category?.trim();
    if (
      initialCategory &&
      !base.some((option) => normalizeCategory(option) === normalizeCategory(initialCategory))
    ) {
      base.push(initialCategory);
    }
    return base;
  });

  useEffect(() => {
    if (initialProduct) {
      setFormData(initialProduct);
      const incomingCategory = initialProduct.basicInfo.category?.trim();
      if (incomingCategory) {
        setCategoryOptions((prev) => {
          if (
            prev.some((option) => normalizeCategory(option) === normalizeCategory(incomingCategory))
          ) {
            return prev;
          }
          return [...prev, incomingCategory];
        });
      }
    } else {
      setFormData(buildDefaultForm());
    }
  }, [initialProduct, adminEmail]);

  const updateForm = <K extends keyof ProductFormData>(
    section: K,
    updater: (prev: ProductFormData[K]) => ProductFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: updater(prev[section]),
    }));
  };

  const addCategoryOption = (category: string) => {
    const trimmed = category.trim();
    if (!trimmed) return;
    setCategoryOptions((prev) => {
      if (prev.some((option) => normalizeCategory(option) === normalizeCategory(trimmed))) {
        return prev;
      }
      const updated = [...prev, trimmed];
      updated.sort((a, b) => a.localeCompare(b));
      return updated;
    });
  };

  const showFeedback = (message: string) => {
    setFeedbackMessage(message);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleVariantAdd = (variant: Omit<VariantData, "sku"> & { sku?: string }) => {
    updateForm("variants", (prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          sku: variant.sku || `${formData.basicInfo.productId}-${variant.color}-${variant.size}`.toLowerCase(),
          color: variant.color,
          size: variant.size,
          priceAdjustment: variant.priceAdjustment,
          stock: variant.stock,
          image: variant.image,
          available: variant.available,
        },
      ],
    }));
  };

  const handleVariantUpdate = (index: number, value: Partial<VariantData>) => {
    updateForm("variants", (prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, ...value } : item)),
    }));
  };

  const handleVariantRemove = (index: number) => {
    updateForm("variants", (prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handlePreview = () => {
    const clone: ProductFormData = JSON.parse(JSON.stringify(formData));

    const previewHandle = computeProductHandle(clone);
    if (!previewHandle || previewHandle === "product") {
      showFeedback("Add at least a product name, slug, or ID before previewing.");
      return;
    }

    clone.basicInfo.productId = clone.basicInfo.productId?.trim() || previewHandle;
    clone.basicInfo.slug = clone.basicInfo.slug?.trim() || previewHandle;

    try {
      localStorage.setItem("productPreviewForm", JSON.stringify(clone));
      const url = `/product/${encodeURIComponent(
        previewHandle,
      )}?preview=true&productId=${encodeURIComponent(clone.basicInfo.productId)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Failed to create preview", error);
      showFeedback("Unable to open preview. Please check your browser settings.");
    }
  };

  const handleSave = async () => {
    const pid = productId || formData.basicInfo.productId.trim();
    if (!pid) {
      showFeedback("Product ID is required before saving.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const timestamp = new Date().toISOString();
      const productCopy: ProductFormData = JSON.parse(JSON.stringify(formData));
      productCopy.basicInfo.productId = pid;
      productCopy.admin.addedBy = productCopy.admin.addedBy || adminEmail;
      productCopy.admin.dateAdded = productCopy.admin.dateAdded || timestamp;
      productCopy.admin.lastModifiedBy = adminEmail;
      productCopy.admin.lastModifiedDate = timestamp;

      await upsertProductForm(productCopy);
      showFeedback(`Product ${pid} saved successfully.`);
      setTimeout(() => {
        onSave();
      }, 1000);
    } catch (error) {
      console.error("Failed to save product", error);
      setErrorMessage("Unable to save product to Firestore. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // This is a simplified version - you'll need to copy all the form sections from AdminDashboard
  // For brevity, I'm showing the structure. You can copy the full form sections.
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {productId ? "Modify Product" : "Add New Product"}
          </h2>
          <p className="mt-1 text-sm text-white/50">
            {productId
              ? `Editing: ${productId}`
              : "Create a new product entry"}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePreview}
            className="rounded-lg border border-white/40 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            View Preview
          </button>
          <button
            onClick={onCancel}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isProcessing}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-white/90 disabled:opacity-50"
          >
            {isProcessing ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </div>
      )}

      {feedbackMessage && (
        <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {feedbackMessage}
        </div>
      )}

      {/* Basic Info Section */}
      <Section title="Basic Product Information" description="Define the core identity of the product.">
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Product ID / SKU"
            value={formData.basicInfo.productId}
            onChange={(value) =>
              updateForm("basicInfo", (prev) => ({ ...prev, productId: value }))
            }
            placeholder="os-001"
            disabled={!!productId}
          />
          <TextInput
            label="Product Name"
            value={formData.basicInfo.name}
            onChange={(value) =>
              updateForm("basicInfo", (prev) => ({ ...prev, name: value }))
            }
            placeholder="Oversized Heavyweight Tee"
          />
          <TextInput
            label="Product Slug"
            value={formData.basicInfo.slug}
            onChange={(value) =>
              updateForm("basicInfo", (prev) => ({ ...prev, slug: value }))
            }
            placeholder="oversized-heavyweight-tee"
          />
          <CategoryInput
            label="Category"
            value={formData.basicInfo.category}
            onChange={(value) =>
              updateForm("basicInfo", (prev) => ({ ...prev, category: value }))
            }
            onCommit={addCategoryOption}
            options={categoryOptions}
            placeholder="Select or enter a category"
          />
          <TextInput
            label="Sub-category"
            value={formData.basicInfo.subCategory}
            onChange={(value) =>
              updateForm("basicInfo", (prev) => ({ ...prev, subCategory: value }))
            }
            placeholder="Oversized"
          />
          <TextInput
            label="Brand Name"
            value={formData.basicInfo.brand}
            onChange={(value) =>
              updateForm("basicInfo", (prev) => ({ ...prev, brand: value }))
            }
            placeholder="Koshak"
          />
          <SelectInput
            label="Product Status"
            value={formData.basicInfo.status}
            onChange={(value) =>
              updateForm("basicInfo", (prev) => ({
                ...prev,
                status: value as ProductFormData["basicInfo"]["status"],
              }))
            }
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "draft", label: "Draft" },
              { value: "out-of-stock", label: "Out of Stock" },
            ]}
          />
        </div>
      </Section>

      {/* Pricing Section */}
      <Section title="Pricing & Inventory" description="Manage pricing strategy and stock levels.">
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Base Price"
            type="number"
            value={formData.pricing.basePrice}
            onChange={(value) =>
              updateForm("pricing", (prev) => ({ ...prev, basePrice: Number(value) || 0 }))
            }
            placeholder="999"
          />
          <TextInput
            label="Sale Price"
            type="number"
            value={formData.pricing.salePrice ?? ""}
            onChange={(value) =>
              updateForm("pricing", (prev) => ({
                ...prev,
                salePrice: value ? Number(value) : null,
              }))
            }
            placeholder="799"
          />
          <TextInput
            label="Currency"
            value={formData.pricing.currency}
            onChange={(value) =>
              updateForm("pricing", (prev) => ({ ...prev, currency: value }))
            }
            placeholder="INR"
          />
          <TextInput
            label="Tax Rate / GST %"
            type="number"
            value={formData.pricing.taxRate}
            onChange={(value) =>
              updateForm("pricing", (prev) => ({ ...prev, taxRate: Number(value) || 0 }))
            }
            placeholder="18"
          />
          <TextInput
            label="Stock Quantity"
            type="number"
            value={formData.pricing.stockQuantity}
            onChange={(value) =>
              updateForm("pricing", (prev) => ({ ...prev, stockQuantity: Number(value) || 0 }))
            }
            placeholder="120"
          />
          <TextInput
            label="Low Stock Threshold"
            type="number"
            value={formData.pricing.lowStockThreshold}
            onChange={(value) =>
              updateForm("pricing", (prev) => ({
                ...prev,
                lowStockThreshold: Number(value) || 0,
              }))
            }
            placeholder="10"
          />
          <SelectInput
            label="Stock Status"
            value={formData.pricing.stockStatus}
            onChange={(value) =>
              updateForm("pricing", (prev) => ({
                ...prev,
                stockStatus: value as ProductFormData["pricing"]["stockStatus"],
              }))
            }
            options={[
              { value: "in-stock", label: "In Stock" },
              { value: "out-of-stock", label: "Out of Stock" },
              { value: "pre-order", label: "Pre-order" },
            ]}
          />
          <ToggleInput
            label="Allow Backorders"
            checked={formData.pricing.backorderAllowed}
            onChange={(checked) =>
              updateForm("pricing", (prev) => ({ ...prev, backorderAllowed: checked }))
            }
          />
        </div>
      </Section>

      {/* Variants Section */}
      <Section title="Product Variants" description="Control size, colour and stock for each variant.">
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput
              label="Available Sizes (comma separated)"
              value={formatList(formData.variants.sizes)}
              onChange={(value) =>
                updateForm("variants", (prev) => ({
                  ...prev,
                  sizes: parseList(value),
                }))
              }
            />
            <TextInput
              label="Available Colours (comma separated)"
              value={formatList(formData.variants.colors)}
              onChange={(value) =>
                updateForm("variants", (prev) => ({
                  ...prev,
                  colors: parseList(value),
                }))
              }
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h4 className="text-sm font-semibold text-white">Add Variant</h4>
            <div className="mt-3 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              <TextInput
                label="Colour"
                value={variantForm.color}
                onChange={(value) => setVariantForm((prev) => ({ ...prev, color: value }))}
              />
              <TextInput
                label="Size"
                value={variantForm.size}
                onChange={(value) => setVariantForm((prev) => ({ ...prev, size: value }))}
              />
              <TextInput
                label="Variant SKU"
                value={variantForm.sku}
                onChange={(value) => setVariantForm((prev) => ({ ...prev, sku: value }))}
                placeholder="os-001-black-xl"
              />
              <TextInput
                label="Price Adjustment"
                value={variantForm.priceAdjustment}
                type="number"
                onChange={(value) =>
                  setVariantForm((prev) => ({ ...prev, priceAdjustment: Number(value) || 0 }))
                }
              />
              <TextInput
                label="Stock"
                value={variantForm.stock}
                type="number"
                onChange={(value) =>
                  setVariantForm((prev) => ({ ...prev, stock: Number(value) || 0 }))
                }
              />
              <TextInput
                label="Variant Image URL"
                value={variantForm.image}
                onChange={(value) => setVariantForm((prev) => ({ ...prev, image: value }))}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <ToggleInput
                label="Variant available"
                checked={variantForm.available}
                onChange={(checked) =>
                  setVariantForm((prev) => ({ ...prev, available: checked }))
                }
              />
              <button
                type="button"
                onClick={() => {
                  handleVariantAdd(variantForm);
                  setVariantForm((prev) => ({ ...prev, sku: "", image: "", stock: 0 }));
                }}
                className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Add Variant
              </button>
            </div>
          </div>

          {formData.variants.items.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm text-white">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/60">
                  <tr>
                    {["SKU", "Colour", "Size", "Price +", "Stock", "Available", "Actions"].map((heading) => (
                      <th key={heading} className="px-4 py-3 font-medium">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {formData.variants.items.map((item, index) => (
                    <tr key={`${item.sku}-${index}`} className="bg-black/20">
                      <td className="px-4 py-3">
                        <input
                          value={item.sku}
                          onChange={(event) =>
                            handleVariantUpdate(index, { sku: event.target.value })
                          }
                          className="w-full rounded border border-white/10 bg-transparent px-3 py-2 text-xs text-white"
                          style={{ color: "white" }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          value={item.color}
                          onChange={(event) =>
                            handleVariantUpdate(index, { color: event.target.value })
                          }
                          className="w-full rounded border border-white/10 bg-transparent px-3 py-2 text-xs text-white"
                          style={{ color: "white" }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          value={item.size}
                          onChange={(event) =>
                            handleVariantUpdate(index, { size: event.target.value })
                          }
                          className="w-full rounded border border-white/10 bg-transparent px-3 py-2 text-xs text-white"
                          style={{ color: "white" }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.priceAdjustment}
                          onChange={(event) =>
                            handleVariantUpdate(index, {
                              priceAdjustment: Number(event.target.value) || 0,
                            })
                          }
                          className="w-full rounded border border-white/10 bg-transparent px-3 py-2 text-xs text-white"
                          style={{ color: "white" }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.stock}
                          onChange={(event) =>
                            handleVariantUpdate(index, { stock: Number(event.target.value) || 0 })
                          }
                          className="w-full rounded border border-white/10 bg-transparent px-3 py-2 text-xs text-white"
                          style={{ color: "white" }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={item.available}
                          onChange={(event) =>
                            handleVariantUpdate(index, { available: event.target.checked })
                          }
                          className="h-4 w-4 rounded border-white/20 bg-transparent accent-white"
                        />
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <button
                          type="button"
                          onClick={() => handleVariantRemove(index)}
                          className="rounded-full border border-red-400/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-red-200 hover:border-red-300/70 hover:text-red-100"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Section>

      {/* Media Section */}
      <Section title="Media & Assets" description="Upload product images or provide image URLs. Supported formats: JPG, PNG, GIF, WebP (max 10MB).">
        <div className="grid gap-6">
          {/* Primary Image Upload */}
          <ImageUpload
            label="Primary Image"
            currentUrl={formData.media.primaryImage}
            onUploadComplete={(url) =>
              updateForm("media", (prev) => ({ ...prev, primaryImage: url }))
            }
            productId={productId || formData.basicInfo.productId || "temp"}
            imageType="primary"
            disabled={!productId && !formData.basicInfo.productId}
          />

          {/* Hover Image Upload */}
          <ImageUpload
            label="Hover Image"
            currentUrl={formData.media.hoverImage}
            onUploadComplete={(url) =>
              updateForm("media", (prev) => ({ ...prev, hoverImage: url }))
            }
            productId={productId || formData.basicInfo.productId || "temp"}
            imageType="hover"
            disabled={!productId && !formData.basicInfo.productId}
          />

          {/* Gallery Images */}
          <div className="flex flex-col gap-2">
            <Label label="Gallery Images" />
            <p className="text-xs text-white/50 mb-2">
              Upload multiple images for the product gallery. You can add images one by one.
            </p>
            <div className="space-y-3">
              {formData.media.galleryImages.map((url, index) => (
                <div key={index} className="flex items-center gap-3">
                  <ImageUpload
                    label={`Gallery Image ${index + 1}`}
                    currentUrl={url}
                    onUploadComplete={(newUrl) => {
                      const updated = [...formData.media.galleryImages];
                      updated[index] = newUrl;
                      updateForm("media", (prev) => ({
                        ...prev,
                        galleryImages: updated,
                      }));
                    }}
                    productId={productId || formData.basicInfo.productId || "temp"}
                    imageType="gallery"
                    disabled={!productId && !formData.basicInfo.productId}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.media.galleryImages.filter((_, i) => i !== index);
                      updateForm("media", (prev) => ({
                        ...prev,
                        galleryImages: updated,
                      }));
                    }}
                    className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/20"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  updateForm("media", (prev) => ({
                    ...prev,
                    galleryImages: [...prev.galleryImages, ""],
                  }));
                }}
                className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                + Add Gallery Image
              </button>
            </div>
          </div>

          {/* Lifestyle Images */}
          <div className="flex flex-col gap-2">
            <Label label="Lifestyle Images" />
            <div className="space-y-3">
              {formData.media.lifestyleImages.map((url, index) => (
                <div key={index} className="flex items-center gap-3">
                  <ImageUpload
                    label={`Lifestyle Image ${index + 1}`}
                    currentUrl={url}
                    onUploadComplete={(newUrl) => {
                      const updated = [...formData.media.lifestyleImages];
                      updated[index] = newUrl;
                      updateForm("media", (prev) => ({
                        ...prev,
                        lifestyleImages: updated,
                      }));
                    }}
                    productId={productId || formData.basicInfo.productId || "temp"}
                    imageType="lifestyle"
                    disabled={!productId && !formData.basicInfo.productId}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.media.lifestyleImages.filter((_, i) => i !== index);
                      updateForm("media", (prev) => ({
                        ...prev,
                        lifestyleImages: updated,
                      }));
                    }}
                    className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/20"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  updateForm("media", (prev) => ({
                    ...prev,
                    lifestyleImages: [...prev.lifestyleImages, ""],
                  }));
                }}
                className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                + Add Lifestyle Image
              </button>
            </div>
          </div>

          {/* Other Media Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput
              label="360° View Images (comma separated URLs)"
              value={formatList(formData.media.view360Images)}
              onChange={(value) =>
                updateForm("media", (prev) => ({
                  ...prev,
                  view360Images: parseList(value),
                }))
              }
            />
            <TextInput
              label="Video URL"
              value={formData.media.videoUrl}
              onChange={(value) =>
                updateForm("media", (prev) => ({ ...prev, videoUrl: value }))
              }
            />
            <TextInput
              label="Image Alt Text"
              value={formData.media.altText}
              onChange={(value) =>
                updateForm("media", (prev) => ({ ...prev, altText: value }))
              }
            />
            <TextInput
              label="Image Order"
              value={formData.media.imageOrder}
              onChange={(value) =>
                updateForm("media", (prev) => ({ ...prev, imageOrder: value }))
              }
              placeholder="primary, hover, gallery-1, gallery-2"
            />
          </div>
        </div>
      </Section>

      {/* Descriptions Section */}
      <Section title="Product Descriptions" description="Craft rich descriptions and product details for customers.">
        <TextAreaInput
          label="Short Description"
          value={formData.descriptions.shortDescription}
          onChange={(value) =>
            updateForm("descriptions", (prev) => ({ ...prev, shortDescription: value }))
          }
          rows={3}
        />
        <TextAreaInput
          label="Long Description"
          value={formData.descriptions.longDescription}
          onChange={(value) =>
            updateForm("descriptions", (prev) => ({ ...prev, longDescription: value }))
          }
          rows={6}
        />
        <TextInput
          label="Product Features (comma separated)"
          value={formatList(formData.descriptions.features)}
          onChange={(value) =>
            updateForm("descriptions", (prev) => ({
              ...prev,
              features: parseList(value),
            }))
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Material / Fabric"
            value={formData.descriptions.material}
            onChange={(value) =>
              updateForm("descriptions", (prev) => ({ ...prev, material: value }))
            }
          />
          <TextInput
            label="Care Instructions"
            value={formData.descriptions.careInstructions}
            onChange={(value) =>
              updateForm("descriptions", (prev) => ({ ...prev, careInstructions: value }))
            }
          />
          <TextInput
            label="Fit Type"
            value={formData.descriptions.fitType}
            onChange={(value) =>
              updateForm("descriptions", (prev) => ({ ...prev, fitType: value }))
            }
          />
          <TextAreaInput
            label="Product Specifications"
            value={formData.descriptions.specifications}
            onChange={(value) =>
              updateForm("descriptions", (prev) => ({ ...prev, specifications: value }))
            }
            rows={4}
          />
        </div>
      </Section>

      {/* Size & Fit Section */}
      <Section title="Size & Fit Information">
        <ToggleInput
          label="Enable Size Chart"
          checked={formData.sizeFit.enableSizeChart}
          onChange={(checked) =>
            updateForm("sizeFit", (prev) => ({ ...prev, enableSizeChart: checked }))
          }
        />
        <TextInput
          label="Size Chart Image"
          value={formData.sizeFit.sizeChartImage}
          onChange={(value) =>
            updateForm("sizeFit", (prev) => ({ ...prev, sizeChartImage: value }))
          }
        />
        <TextAreaInput
          label="Measurement Table"
          value={formData.sizeFit.measurementTable}
          onChange={(value) =>
            updateForm("sizeFit", (prev) => ({ ...prev, measurementTable: value }))
          }
          rows={4}
        />
        <TextInput
          label="Fit Description"
          value={formData.sizeFit.fitDescription}
          onChange={(value) =>
            updateForm("sizeFit", (prev) => ({ ...prev, fitDescription: value }))
          }
        />
        <TextInput
          label="Model Information"
          value={formData.sizeFit.modelInformation}
          onChange={(value) =>
            updateForm("sizeFit", (prev) => ({ ...prev, modelInformation: value }))
          }
        />
      </Section>

      {/* Shipping Section */}
      <Section title="Shipping & Delivery">
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Weight"
            value={formData.shipping.weight}
            onChange={(value) =>
              updateForm("shipping", (prev) => ({ ...prev, weight: value }))
            }
          />
          <TextInput
            label="Dimensions (L x W x H)"
            value={formData.shipping.dimensions}
            onChange={(value) =>
              updateForm("shipping", (prev) => ({ ...prev, dimensions: value }))
            }
          />
          <TextInput
            label="Shipping Class"
            value={formData.shipping.shippingClass}
            onChange={(value) =>
              updateForm("shipping", (prev) => ({ ...prev, shippingClass: value }))
            }
          />
          <TextInput
            label="Estimated Delivery Time"
            value={formData.shipping.estimatedDelivery}
            onChange={(value) =>
              updateForm("shipping", (prev) => ({ ...prev, estimatedDelivery: value }))
            }
          />
          <TextInput
            label="Free Shipping Threshold"
            value={formData.shipping.freeShippingThreshold}
            onChange={(value) =>
              updateForm("shipping", (prev) => ({ ...prev, freeShippingThreshold: value }))
            }
          />
          <TextInput
            label="Shipping Restrictions"
            value={formData.shipping.restrictions}
            onChange={(value) =>
              updateForm("shipping", (prev) => ({ ...prev, restrictions: value }))
            }
          />
          <TextAreaInput
            label="Return Policy"
            value={formData.shipping.returnPolicy}
            onChange={(value) =>
              updateForm("shipping", (prev) => ({ ...prev, returnPolicy: value }))
            }
          />
          <TextAreaInput
            label="Exchange Policy"
            value={formData.shipping.exchangePolicy}
            onChange={(value) =>
              updateForm("shipping", (prev) => ({ ...prev, exchangePolicy: value }))
            }
          />
        </div>
      </Section>

      {/* SEO Section */}
      <Section title="SEO & Marketing">
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Meta Title"
            value={formData.seo.metaTitle}
            onChange={(value) =>
              updateForm("seo", (prev) => ({ ...prev, metaTitle: value }))
            }
          />
          <TextInput
            label="Meta Description"
            value={formData.seo.metaDescription}
            onChange={(value) =>
              updateForm("seo", (prev) => ({ ...prev, metaDescription: value }))
            }
          />
          <TextInput
            label="Meta Keywords"
            value={formData.seo.metaKeywords}
            onChange={(value) =>
              updateForm("seo", (prev) => ({ ...prev, metaKeywords: value }))
            }
          />
          <TextInput
            label="Canonical URL"
            value={formData.seo.canonicalUrl}
            onChange={(value) =>
              updateForm("seo", (prev) => ({ ...prev, canonicalUrl: value }))
            }
          />
          <TextInput
            label="OG Image"
            value={formData.seo.ogImage}
            onChange={(value) =>
              updateForm("seo", (prev) => ({ ...prev, ogImage: value }))
            }
          />
          <TextInput
            label="OG Title"
            value={formData.seo.ogTitle}
            onChange={(value) =>
              updateForm("seo", (prev) => ({ ...prev, ogTitle: value }))
            }
          />
          <TextInput
            label="OG Description"
            value={formData.seo.ogDescription}
            onChange={(value) =>
              updateForm("seo", (prev) => ({ ...prev, ogDescription: value }))
            }
          />
          <TextInput
            label="Product Tags"
            value={formatList(formData.seo.tags)}
            onChange={(value) =>
              updateForm("seo", (prev) => ({ ...prev, tags: parseList(value) }))
            }
          />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <ToggleInput
            label="Mark as Featured"
            checked={formData.seo.featured}
            onChange={(checked) =>
              updateForm("seo", (prev) => ({ ...prev, featured: checked }))
            }
          />
          <ToggleInput
            label="Mark as New Arrival"
            checked={formData.seo.newArrival}
            onChange={(checked) =>
              updateForm("seo", (prev) => ({ ...prev, newArrival: checked }))
            }
          />
          <ToggleInput
            label="Mark as Best Seller"
            checked={formData.seo.bestSeller}
            onChange={(checked) =>
              updateForm("seo", (prev) => ({ ...prev, bestSeller: checked }))
            }
          />
        </div>
      </Section>

      {/* Reviews Section */}
      <Section title="Reviews & Social Proof">
        <ToggleInput
          label="Allow customer reviews"
          checked={formData.reviews.allowReviews}
          onChange={(checked) =>
            updateForm("reviews", (prev) => ({ ...prev, allowReviews: checked }))
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          <TextInput
            label="Average Rating"
            type="number"
            value={formData.reviews.averageRating}
            onChange={(value) =>
              updateForm("reviews", (prev) => ({ ...prev, averageRating: Number(value) || 0 }))
            }
          />
          <TextInput
            label="Total Reviews"
            type="number"
            value={formData.reviews.totalReviews}
            onChange={(value) =>
              updateForm("reviews", (prev) => ({ ...prev, totalReviews: Number(value) || 0 }))
            }
          />
          <SelectInput
            label="Review Moderation"
            value={formData.reviews.moderation}
            onChange={(value) =>
              updateForm("reviews", (prev) => ({
                ...prev,
                moderation: value as ProductFormData["reviews"]["moderation"],
              }))
            }
            options={[
              { value: "manual", label: "Manual approval" },
              { value: "auto", label: "Auto publish" },
            ]}
          />
        </div>
      </Section>

      {/* Related Section */}
      <Section title="Related & Merchandising">
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Related Products"
            value={formatList(formData.related.relatedProducts)}
            onChange={(value) =>
              updateForm("related", (prev) => ({
                ...prev,
                relatedProducts: parseList(value),
              }))
            }
          />
          <TextInput
            label="Frequently Bought Together"
            value={formatList(formData.related.frequentlyBoughtTogether)}
            onChange={(value) =>
              updateForm("related", (prev) => ({
                ...prev,
                frequentlyBoughtTogether: parseList(value),
              }))
            }
          />
          <TextInput
            label="Cross-sell Products"
            value={formatList(formData.related.crossSell)}
            onChange={(value) =>
              updateForm("related", (prev) => ({
                ...prev,
                crossSell: parseList(value),
              }))
            }
          />
          <TextInput
            label="Up-sell Products"
            value={formatList(formData.related.upSell)}
            onChange={(value) =>
              updateForm("related", (prev) => ({ ...prev, upSell: parseList(value) }))
            }
          />
        </div>
      </Section>

      {/* Advanced Section */}
      <Section title="Advanced Settings">
        <SelectInput
          label="Product Type"
          value={formData.advanced.productType}
          onChange={(value) =>
            updateForm("advanced", (prev) => ({
              ...prev,
              productType: value as ProductFormData["advanced"]["productType"],
            }))
          }
          options={[
            { value: "simple", label: "Simple" },
            { value: "variable", label: "Variable" },
            { value: "bundle", label: "Bundle" },
          ]}
        />
        <TextAreaInput
          label="Custom Fields"
          value={formData.advanced.customFields}
          onChange={(value) =>
            updateForm("advanced", (prev) => ({ ...prev, customFields: value }))
          }
        />
        <TextInput
          label="Badges"
          value={formatList(formData.advanced.badges)}
          onChange={(value) =>
            updateForm("advanced", (prev) => ({ ...prev, badges: parseList(value) }))
          }
        />
        <ToggleInput
          label="Enable Pre-orders"
          checked={formData.advanced.preOrderEnabled}
          onChange={(checked) =>
            updateForm("advanced", (prev) => ({ ...prev, preOrderEnabled: checked }))
          }
        />
        {formData.advanced.preOrderEnabled && (
          <TextInput
            label="Pre-order Release Date"
            type="date"
            value={formData.advanced.preOrderReleaseDate ?? ""}
            onChange={(value) =>
              updateForm("advanced", (prev) => ({ ...prev, preOrderReleaseDate: value }))
            }
          />
        )}
        <ToggleInput
          label="Enable Inventory Tracking"
          checked={formData.advanced.inventoryTracking}
          onChange={(checked) =>
            updateForm("advanced", (prev) => ({ ...prev, inventoryTracking: checked }))
          }
        />
        <ToggleInput
          label="Sold Individually"
          checked={formData.advanced.soldIndividually}
          onChange={(checked) =>
            updateForm("advanced", (prev) => ({ ...prev, soldIndividually: checked }))
          }
        />
        <TextAreaInput
          label="Purchase Note"
          value={formData.advanced.purchaseNote}
          onChange={(value) =>
            updateForm("advanced", (prev) => ({ ...prev, purchaseNote: value }))
          }
        />
      </Section>

      {/* Scheduling Section */}
      <Section title="Schedule & Availability">
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Available From"
            type="date"
            value={formData.scheduling.availableFrom ?? ""}
            onChange={(value) =>
              updateForm("scheduling", (prev) => ({ ...prev, availableFrom: value || undefined }))
            }
          />
          <TextInput
            label="Available Until"
            type="date"
            value={formData.scheduling.availableUntil ?? ""}
            onChange={(value) =>
              updateForm("scheduling", (prev) => ({ ...prev, availableUntil: value || undefined }))
            }
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <ToggleInput
            label="Seasonal Product"
            checked={formData.scheduling.seasonal}
            onChange={(checked) =>
              updateForm("scheduling", (prev) => ({ ...prev, seasonal: checked }))
            }
          />
          <ToggleInput
            label="Limited Edition"
            checked={formData.scheduling.limitedEdition}
            onChange={(checked) =>
              updateForm("scheduling", (prev) => ({ ...prev, limitedEdition: checked }))
            }
          />
        </div>
      </Section>

      {/* Admin Section */}
      <Section title="Internal Notes & Audit Trail">
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Added By"
            value={formData.admin.addedBy}
            onChange={(value) =>
              updateForm("admin", (prev) => ({ ...prev, addedBy: value }))
            }
            placeholder="admin@koshak.in"
          />
          <TextInput
            label="Last Modified By"
            value={formData.admin.lastModifiedBy}
            onChange={(value) =>
              updateForm("admin", (prev) => ({ ...prev, lastModifiedBy: value }))
            }
            placeholder="admin@koshak.in"
          />
        </div>
        <TextAreaInput
          label="Product Notes"
          value={formData.admin.notes}
          onChange={(value) =>
            updateForm("admin", (prev) => ({ ...prev, notes: value }))
          }
          rows={4}
        />
      </Section>
    </div>
  );
};

