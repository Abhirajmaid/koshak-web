"use client";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  type CollectionReference,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";
import type { Product } from "@/types";
import {
  defaultProductFormData,
  type ProductFormData,
  type VariantData,
} from "@/types/admin";

const COLLECTION_NAME = "products";

const sanitizeForFirestore = <T>(data: T): T =>
  JSON.parse(JSON.stringify(data)) as T;

const mergeFormData = (snapshotData: Partial<ProductFormData>): ProductFormData => {
  const defaults = defaultProductFormData();

  return {
    basicInfo: {
      ...defaults.basicInfo,
      ...snapshotData.basicInfo,
    },
    pricing: {
      ...defaults.pricing,
      ...snapshotData.pricing,
    },
    variants: {
      sizes: snapshotData.variants?.sizes ?? defaults.variants.sizes,
      colors: snapshotData.variants?.colors ?? defaults.variants.colors,
      items: snapshotData.variants?.items ?? defaults.variants.items,
    },
    media: {
      ...defaults.media,
      ...snapshotData.media,
    },
    descriptions: {
      ...defaults.descriptions,
      ...snapshotData.descriptions,
    },
    sizeFit: {
      ...defaults.sizeFit,
      ...snapshotData.sizeFit,
    },
    shipping: {
      ...defaults.shipping,
      ...snapshotData.shipping,
    },
    seo: {
      ...defaults.seo,
      ...snapshotData.seo,
    },
    reviews: {
      ...defaults.reviews,
      ...snapshotData.reviews,
    },
    related: {
      relatedProducts:
        snapshotData.related?.relatedProducts ?? defaults.related.relatedProducts,
      frequentlyBoughtTogether:
        snapshotData.related?.frequentlyBoughtTogether ??
        defaults.related.frequentlyBoughtTogether,
      crossSell: snapshotData.related?.crossSell ?? defaults.related.crossSell,
      upSell: snapshotData.related?.upSell ?? defaults.related.upSell,
    },
    advanced: {
      ...defaults.advanced,
      ...snapshotData.advanced,
    },
    scheduling: {
      ...defaults.scheduling,
      ...snapshotData.scheduling,
    },
    admin: {
      ...defaults.admin,
      ...snapshotData.admin,
    },
  };
};

const productFormConverter: FirestoreDataConverter<ProductFormData> = {
  toFirestore: (data) => sanitizeForFirestore(data),
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const raw = snapshot.data();
    return mergeFormData(raw as Partial<ProductFormData>);
  },
};

const getCollection = (): CollectionReference<ProductFormData> =>
  collection(getFirestoreDb(), COLLECTION_NAME).withConverter(productFormConverter);

const simplifyCareInstructions = (value: string): string[] =>
  value
    .split(/\r?\n|,/)
    .map((entry) => entry.trim())
    .filter(Boolean);

const parseSpecifications = (value: string): Record<string, string> => {
  const lines = value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const result: Record<string, string> = {};

  lines.forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      result[key.trim()] = rest.join(":").trim();
    }
  });

  return result;
};

const buildMeasurements = (form: ProductFormData): Product["measurements"] => {
  const map: Product["measurements"] = {};
  const lines = form.sizeFit.measurementTable
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  lines.forEach((line) => {
    const [size, measurements] = line.split(":");
    if (!size || !measurements) {
      return;
    }
    const detailParts = measurements.split(",").map((item) => item.trim()).filter(Boolean);
    const detail: Record<string, string> = {};
    detailParts.forEach((part) => {
      const [label, value] = part.split("=").map((segment) => segment.trim());
      if (label && value) {
        detail[label] = value;
      }
    });

    if (Object.keys(detail).length > 0) {
      map[size.trim()] = detail;
    }
  });

  return map;
};

const sanitizeHandle = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const computeProductHandle = (form: ProductFormData): string => {
  const explicit =
    form.basicInfo.slug?.trim() ||
    form.basicInfo.productId?.trim() ||
    form.basicInfo.name?.trim();
  if (!explicit) {
    return "product";
  }

  return sanitizeHandle(explicit);
};

const formatVariants = (form: ProductFormData) => {
  const sizes = new Set(form.variants.sizes);
  const colors = new Set(form.variants.colors);

  form.variants.items.forEach((variant: VariantData) => {
    if (variant.size) {
      sizes.add(variant.size);
    }
    if (variant.color) {
      colors.add(variant.color);
    }
  });

  return {
    sizes: Array.from(sizes).filter(Boolean),
    colors: Array.from(colors).filter(Boolean),
  };
};

export const formToCatalogProduct = (form: ProductFormData): Product => {
  const { sizes, colors } = formatVariants(form);
  const basePrice = form.pricing.basePrice || 0;
  const salePrice = form.pricing.salePrice ?? undefined;
  const effectivePrice = salePrice ?? basePrice;
  const handle = computeProductHandle(form);
  const identifier = form.basicInfo.productId?.trim() || handle;

  const primaryImage = form.media.primaryImage || form.media.galleryImages[0] || "";
  const gallery = form.media.galleryImages.length
    ? form.media.galleryImages
    : primaryImage
      ? [primaryImage]
      : [];

  const careInstructions = simplifyCareInstructions(form.descriptions.careInstructions);

  return {
    id: identifier,
    slug: form.basicInfo.slug?.trim() || undefined,
    handle,
    name: form.basicInfo.name,
    price: effectivePrice,
    originalPrice: salePrice ? basePrice : undefined,
    image: primaryImage,
    images: gallery,
    category: form.basicInfo.category,
    description: form.descriptions.shortDescription,
    detailedDescription: form.descriptions.longDescription,
    sizes,
    colors,
    inStock: form.pricing.stockStatus !== "out-of-stock" && effectivePrice > 0,
    featured: form.seo.featured,
    rating: form.reviews.averageRating,
    reviewCount: form.reviews.totalReviews,
    fabric: form.descriptions.material,
    occasion: form.seo.tags.slice(0, 5),
    careInstructions: careInstructions.length ? careInstructions : ["Follow garment label instructions"],
    features: form.descriptions.features,
    measurements: buildMeasurements(form),
    specifications: parseSpecifications(form.descriptions.specifications),
    tags: form.seo.tags,
    sku: form.basicInfo.productId,
    weight: form.shipping.weight,
    origin: "Made in India",
  };
};

export const listProductForms = async () => {
  const snapshot = await getDocs(getCollection());
  return snapshot.docs.map((doc) => doc.data());
};

export const getProductForm = async (productId: string) => {
  const trimmedId = productId.trim();
  const docRef = doc(getCollection(), trimmedId);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
};

export const upsertProductForm = async (form: ProductFormData) => {
  const rawProductId = form.basicInfo.productId;
  if (!rawProductId) {
    throw new Error("Product ID is required");
  }

  const productId = rawProductId.trim();
  if (!productId) {
    throw new Error("Product ID is required");
  }

  try {
    console.log("upsertProductForm: Initializing Firestore...");
    const db = getFirestoreDb();
    console.log("upsertProductForm: Firestore initialized");
    
    const docRef = doc(getCollection(), productId);
    const sanitizedData = sanitizeForFirestore({
      ...form,
      basicInfo: {
        ...form.basicInfo,
        productId,
      },
    });
    
    console.log("upsertProductForm: Saving to Firestore:", {
      productId,
      collection: COLLECTION_NAME,
      dataKeys: Object.keys(sanitizedData),
    });
    
    await setDoc(docRef, sanitizedData, { merge: false });
    console.log("upsertProductForm: Successfully saved to Firestore:", productId);
  } catch (error) {
    console.error("upsertProductForm: Error saving to Firestore:", error);
    throw error;
  }
};

export const removeProductForm = async (productId: string) => {
  const trimmedId = productId.trim();
  if (!trimmedId) {
    throw new Error("Product ID is required");
  }
  await deleteDoc(doc(getCollection(), trimmedId));
};

export const listCatalogProducts = async (): Promise<Product[]> => {
  const forms = await listProductForms();
  return forms.map(formToCatalogProduct).filter((product) => product.id);
};

export const getCatalogProductById = async (productId: string) => {
  const form = await getProductForm(productId);
  return form ? formToCatalogProduct(form) : null;
};

export const subscribeToProductForms = (
  onChange: (products: ProductFormData[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe => {
  try {
    console.log("subscribeToProductForms: Initializing Firestore...");
    const db = getFirestoreDb();
    console.log("subscribeToProductForms: Firestore initialized, setting up subscription...");
    
    return onSnapshot(
      getCollection(),
      (snapshot) => {
        console.log("subscribeToProductForms: Snapshot received, docs count:", snapshot.docs.length);
        const forms = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("subscribeToProductForms: Document:", doc.id, "has productId:", data.basicInfo?.productId);
          return data;
        });
        onChange(forms);
      },
      (error) => {
        console.error("subscribeToProductForms: Realtime subscription error", error);
        onError?.(error as Error);
      },
    );
  } catch (error) {
    console.error("subscribeToProductForms: Error setting up subscription", error);
    onError?.(error as Error);
    // Return a no-op unsubscribe function
    return () => {};
  }
};

