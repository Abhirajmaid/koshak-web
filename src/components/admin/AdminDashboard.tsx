"use client";

import { useEffect, useState } from "react";
import { getFirebaseApp } from "@/lib/firebase";
import { subscribeToProductForms, removeProductForm, upsertProductForm } from "@/services/products";
import {
  defaultProductFormData,
  type ProductFormData,
  type VariantData,
} from "@/types/admin";

type DashboardView = "add" | "update" | "remove";

interface AdminDashboardProps {
  adminEmail: string;
  onSignOut: () => void;
}

interface ProductRecordSummary {
  id: string;
  name: string;
  status: ProductFormData["basicInfo"]["status"];
  updatedAt?: string;
}

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
      className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-60 autofill:bg-black/30 autofill:text-white"
      placeholder={placeholder}
      style={{ color: 'white' }}
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
      style={{ color: 'white' }}
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
      style={{ color: 'white' }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-neutral-900">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const parseList = (value: string) =>
  value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

const formatList = (values: string[]) => values.join(", ");

export const AdminDashboard = ({ adminEmail, onSignOut }: AdminDashboardProps) => {

  const buildDefaultForm = () => {
    const base = defaultProductFormData();
    base.admin.addedBy = adminEmail;
    base.admin.lastModifiedBy = adminEmail;
    return base;
  };

  const [view, setView] = useState<DashboardView>("add");
  const [formData, setFormData] = useState<ProductFormData>(() => buildDefaultForm());
  const [products, setProducts] = useState<Record<string, ProductFormData>>({});
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Real-time subscription to Firebase - keeps data in sync automatically
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

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const updateForm = <K extends keyof ProductFormData>(
    section: K,
    updater: (prev: ProductFormData[K]) => ProductFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: updater(prev[section]),
    }));
  };

  const resetForm = () => {
    setFormData(buildDefaultForm());
    setSelectedProductId("");
  };

  const showFeedback = (message: string) => {
    setFeedbackMessage(message);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleAddProduct = async () => {
    const productId = formData.basicInfo.productId.trim();
    if (!productId) {
      showFeedback("Product ID is required before saving.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const timestamp = new Date().toISOString();
      const productCopy: ProductFormData = JSON.parse(JSON.stringify(formData));
      productCopy.basicInfo.productId = productId;
      productCopy.admin.addedBy = productCopy.admin.addedBy || adminEmail;
      productCopy.admin.dateAdded = productCopy.admin.dateAdded || timestamp;
      productCopy.admin.lastModifiedBy = adminEmail;
      productCopy.admin.lastModifiedDate = timestamp;

      console.log("AdminDashboard: Saving product to Firestore:", productId);
      await upsertProductForm(productCopy);
      console.log("AdminDashboard: Product saved successfully:", productId);
      // No need to call loadProducts() - real-time subscription will update automatically
      resetForm();
      showFeedback(`Product ${productId} saved to Firestore.`);
    } catch (error) {
      console.error("Failed to add product", error);
      setErrorMessage("Unable to save product to Firestore. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    const trimmedId = productId.trim();
    if (!trimmedId) {
      showFeedback("Enter a product ID to remove.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      await removeProductForm(trimmedId);
      // No need to call loadProducts() - real-time subscription will update automatically
      if (selectedProductId === trimmedId) {
        resetForm();
      }
      showFeedback(`Product ${trimmedId} removed from Firestore.`);
    } catch (error) {
      console.error("Failed to remove product", error);
      setErrorMessage("Unable to delete product. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePopulateForUpdate = (productId: string) => {
    setSelectedProductId(productId);
    const productRecord = products[productId];
    if (productRecord) {
      const clone: ProductFormData = JSON.parse(JSON.stringify(productRecord));
      setFormData(clone);
    }
  };

  const handleUpdateProduct = async () => {
    const productId = selectedProductId || formData.basicInfo.productId.trim();
    if (!productId) {
      showFeedback("Select a product to update from the list.");
      return;
    }

    if (!products[productId]) {
      showFeedback(`Product ${productId} not found.`);
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const timestamp = new Date().toISOString();
      const updatedCopy: ProductFormData = JSON.parse(JSON.stringify(formData));
      updatedCopy.basicInfo.productId = productId;
      updatedCopy.admin.addedBy = updatedCopy.admin.addedBy || products[productId].admin.addedBy || adminEmail;
      updatedCopy.admin.dateAdded = updatedCopy.admin.dateAdded || products[productId].admin.dateAdded;
      updatedCopy.admin.lastModifiedBy = adminEmail;
      updatedCopy.admin.lastModifiedDate = timestamp;

      await upsertProductForm(updatedCopy);
      // No need to call loadProducts() - real-time subscription will update automatically
      showFeedback(`Product ${productId} updated.`);
    } catch (error) {
      console.error("Failed to update product", error);
      setErrorMessage("Unable to update product. Please try again.");
    } finally {
      setIsProcessing(false);
    }
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

  const [variantForm, setVariantForm] = useState({
    color: "Black",
    size: "M",
    priceAdjustment: 0,
    stock: 0,
    image: "",
    available: true,
    sku: "",
  });

  const productList: ProductRecordSummary[] = Object.entries(products).map(([productId, record]) => ({
    id: productId,
    name: record.basicInfo.name,
    status: record.basicInfo.status,
    updatedAt: record.admin.lastModifiedDate,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white">
      <header className="border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Koshak Admin Suite</p>
            <h1 className="text-2xl font-semibold">Product Management Dashboard</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <div className="text-right">
              <p className="font-medium text-white">{adminEmail}</p>
              <p className="text-xs text-white/50">Signed in as administrator</p>
            </div>
            <button
              onClick={onSignOut}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <nav className="flex flex-wrap gap-3">
          {([
            ["add", "Add Product"],
            ["update", "Update Product"],
            ["remove", "Remove Product"],
          ] as [DashboardView, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setView(key);
                if (key === "add") {
                  resetForm();
                }
              }}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                view === key
                  ? "border-white bg-white text-neutral-900"
                  : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {isLoading ? (
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            Syncing products from Firestore...
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {errorMessage}
          </div>
        ) : null}

        {feedbackMessage ? (
          <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {feedbackMessage}
          </div>
        ) : null}

        {view !== "remove" ? (
          <div className="grid gap-6">
            <Section title="Basic Product Information" description="Define the core identity of the product.">
              <div className="grid gap-4 md:grid-cols-2">
                <TextInput
                  label="Product ID / SKU"
                  value={formData.basicInfo.productId}
                  onChange={(value) =>
                    updateForm("basicInfo", (prev) => ({ ...prev, productId: value }))
                  }
                  placeholder="os-001"
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
                <TextInput
                  label="Category"
                  value={formData.basicInfo.category}
                  onChange={(value) =>
                    updateForm("basicInfo", (prev) => ({ ...prev, category: value }))
                  }
                  placeholder="T-shirts"
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

                {formData.variants.items.length ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-left text-sm text-white">
                      <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/60">
                        <tr>
                          {[
                            "SKU",
                            "Colour",
                            "Size",
                            "Price +",
                            "Stock",
                            "Available",
                            "Actions",
                          ].map((heading) => (
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
                                style={{ color: 'white' }}
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                value={item.color}
                                onChange={(event) =>
                                  handleVariantUpdate(index, { color: event.target.value })
                                }
                                className="w-full rounded border border-white/10 bg-transparent px-3 py-2 text-xs text-white"
                                style={{ color: 'white' }}
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                value={item.size}
                                onChange={(event) =>
                                  handleVariantUpdate(index, { size: event.target.value })
                                }
                                className="w-full rounded border border-white/10 bg-transparent px-3 py-2 text-xs text-white"
                                style={{ color: 'white' }}
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
                                style={{ color: 'white' }}
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
                                style={{ color: 'white' }}
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
                ) : null}
              </div>
            </Section>

            <Section title="Media & Assets" description="Manage product imagery, videos and asset ordering.">
              <div className="grid gap-4 md:grid-cols-2">
                <TextInput
                  label="Primary Image URL"
                  value={formData.media.primaryImage}
                  onChange={(value) =>
                    updateForm("media", (prev) => ({ ...prev, primaryImage: value }))
                  }
                />
                <TextInput
                  label="Hover Image URL"
                  value={formData.media.hoverImage}
                  onChange={(value) =>
                    updateForm("media", (prev) => ({ ...prev, hoverImage: value }))
                  }
                />
                <TextInput
                  label="Gallery Images (comma separated URLs)"
                  value={formatList(formData.media.galleryImages)}
                  onChange={(value) =>
                    updateForm("media", (prev) => ({
                      ...prev,
                      galleryImages: parseList(value),
                    }))
                  }
                />
                <TextInput
                  label="Lifestyle Images"
                  value={formatList(formData.media.lifestyleImages)}
                  onChange={(value) =>
                    updateForm("media", (prev) => ({
                      ...prev,
                      lifestyleImages: parseList(value),
                    }))
                  }
                />
                <TextInput
                  label="360° View Images"
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
            </Section>

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
              {formData.advanced.preOrderEnabled ? (
                <TextInput
                  label="Pre-order Release Date"
                  type="date"
                  value={formData.advanced.preOrderReleaseDate ?? ""}
                  onChange={(value) =>
                    updateForm("advanced", (prev) => ({ ...prev, preOrderReleaseDate: value }))
                  }
                />
              ) : null}
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

            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40 hover:text-white"
              >
                Reset Form
              </button>
              {view === "add" ? (
                <button
                  type="button"
                  onClick={handleAddProduct}
                  disabled={isProcessing}
                  className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:bg-white/60"
                >
                  Save New Product
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleUpdateProduct}
                  disabled={isProcessing}
                  className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:bg-white/60"
                >
                  Save Updates
                </button>
              )}
            </div>
          </div>
        ) : null}

        {view === "update" ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">
              Select Product to Update
            </h2>
            <p className="mt-1 text-sm text-white/50">
              Load an existing product record to make changes.
            </p>
            <div className="mt-4 grid gap-4">
              <select
                value={selectedProductId}
                onChange={(event) => handlePopulateForUpdate(event.target.value)}
                className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
                style={{ color: 'white' }}
              >
                <option value="" className="bg-neutral-900">
                  Select a product record
                </option>
                {productList.map((product) => (
                  <option key={product.id} value={product.id} className="bg-neutral-900">
                    {product.id} · {product.name}
                  </option>
                ))}
              </select>

              {selectedProductId ? (
                <div className="text-xs text-white/40">
                  Last updated: {products[selectedProductId]?.admin.lastModifiedDate ?? "-"}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {view === "remove" ? (
          <div className="grid gap-6">
            <Section title="Remove Product" description="Permanently delete a product from Firestore and the storefront.">
              <p className="text-sm text-white/60">
                Deleting a product removes it from the admin dashboard and the live storefront once
                data is reloaded. This cannot be undone.
              </p>
              <div className="mt-4 flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  placeholder="Enter product ID"
                  className="flex-1 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  value={selectedProductId}
                  onChange={(event) => setSelectedProductId(event.target.value)}
                  style={{ color: 'white' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(selectedProductId)}
                  disabled={isProcessing}
                  className="rounded-full border border-red-400/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-red-200 transition hover:border-red-400/80 hover:text-red-100 disabled:cursor-not-allowed disabled:border-red-400/20 disabled:text-red-200/60"
                >
                  Remove Product
                </button>
              </div>
            </Section>
          </div>
        ) : null}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Dashboard Records</h2>
          <p className="mt-1 text-sm text-white/50">
            A quick overview of the products managed during this session.
          </p>
          {productList.length ? (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm text-white">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/60">
                  <tr>
                    {[
                      "Product ID",
                      "Name",
                      "Status",
                      "Last Updated",
                    ].map((heading) => (
                      <th key={heading} className="px-4 py-3 font-medium">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {productList.map((product) => (
                    <tr key={product.id} className="bg-black/20">
                      <td className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                        {product.id}
                      </td>
                      <td className="px-4 py-3">{product.name || "—"}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/60">{product.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-6 text-sm text-white/50">
              No products added yet. Use the forms above to manage your catalog.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

