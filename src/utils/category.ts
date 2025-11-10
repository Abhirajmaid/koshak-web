import type { Product } from "@/types";

export interface CategoryOption {
  key: string;
  id: string;
  label: string;
  image?: string;
}

export const normalizeCategoryId = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

export const formatCategoryLabel = (value: string) => {
  const cleaned = value.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "Category";
  }
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const buildCategoryOptions = (products: Product[]): CategoryOption[] => {
  const map = new Map<string, CategoryOption>();

  products.forEach((product) => {
    const raw = product.category?.trim();
    if (!raw) {
      return;
    }

    const key = normalizeCategoryId(raw);
    const existing = map.get(key);

    if (existing) {
      if (!existing.image && product.image) {
        map.set(key, { ...existing, image: product.image });
      }
      return;
    }

    map.set(key, {
      key,
      id: raw,
      label: formatCategoryLabel(raw),
      image: product.image,
    });
  });

  return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
};

