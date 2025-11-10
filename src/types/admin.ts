export type StockStatus = "in-stock" | "out-of-stock" | "pre-order";

export interface VariantData {
  color: string;
  size: string;
  sku: string;
  priceAdjustment: number;
  stock: number;
  image?: string;
  available: boolean;
}

export interface ProductFormData {
  basicInfo: {
    productId: string;
    name: string;
    slug: string;
    category: string;
    subCategory: string;
    brand: string;
    status: "active" | "inactive" | "draft" | "out-of-stock";
  };
  pricing: {
    basePrice: number;
    salePrice?: number | null;
    currency: string;
    taxRate: number;
    stockQuantity: number;
    lowStockThreshold: number;
    stockStatus: StockStatus;
    backorderAllowed: boolean;
  };
  variants: {
    sizes: string[];
    colors: string[];
    items: VariantData[];
  };
  media: {
    primaryImage: string;
    galleryImages: string[];
    altText: string;
    imageOrder: string;
    hoverImage: string;
    videoUrl: string;
    view360Images: string[];
    lifestyleImages: string[];
  };
  descriptions: {
    shortDescription: string;
    longDescription: string;
    features: string[];
    material: string;
    careInstructions: string;
    fitType: string;
    specifications: string;
  };
  sizeFit: {
    enableSizeChart: boolean;
    sizeChartImage: string;
    measurementTable: string;
    fitDescription: string;
    modelInformation: string;
  };
  shipping: {
    weight: string;
    dimensions: string;
    shippingClass: string;
    estimatedDelivery: string;
    freeShippingThreshold: string;
    restrictions: string;
    returnPolicy: string;
    exchangePolicy: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    canonicalUrl: string;
    ogImage: string;
    ogTitle: string;
    ogDescription: string;
    tags: string[];
    featured: boolean;
    newArrival: boolean;
    bestSeller: boolean;
  };
  reviews: {
    allowReviews: boolean;
    averageRating: number;
    totalReviews: number;
    moderation: "auto" | "manual";
  };
  related: {
    relatedProducts: string[];
    frequentlyBoughtTogether: string[];
    crossSell: string[];
    upSell: string[];
  };
  advanced: {
    productType: "simple" | "variable" | "bundle";
    customFields: string;
    badges: string[];
    preOrderEnabled: boolean;
    preOrderReleaseDate?: string;
    inventoryTracking: boolean;
    soldIndividually: boolean;
    purchaseNote: string;
  };
  scheduling: {
    availableFrom?: string;
    availableUntil?: string;
    seasonal: boolean;
    limitedEdition: boolean;
  };
  admin: {
    addedBy: string;
    dateAdded?: string;
    lastModifiedBy: string;
    lastModifiedDate?: string;
    notes: string;
  };
}

export const defaultProductFormData = (): ProductFormData => ({
  basicInfo: {
    productId: "",
    name: "",
    slug: "",
    category: "",
    subCategory: "",
    brand: "Koshak",
    status: "draft",
  },
  pricing: {
    basePrice: 0,
    salePrice: null,
    currency: "INR",
    taxRate: 0,
    stockQuantity: 0,
    lowStockThreshold: 5,
    stockStatus: "in-stock",
    backorderAllowed: false,
  },
  variants: {
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    colors: ["Black", "White", "Grey"],
    items: [],
  },
  media: {
    primaryImage: "",
    galleryImages: [],
    altText: "",
    imageOrder: "",
    hoverImage: "",
    videoUrl: "",
    view360Images: [],
    lifestyleImages: [],
  },
  descriptions: {
    shortDescription: "",
    longDescription: "",
    features: [],
    material: "",
    careInstructions: "",
    fitType: "",
    specifications: "",
  },
  sizeFit: {
    enableSizeChart: true,
    sizeChartImage: "",
    measurementTable: "",
    fitDescription: "",
    modelInformation: "",
  },
  shipping: {
    weight: "",
    dimensions: "",
    shippingClass: "Standard",
    estimatedDelivery: "5-7 days",
    freeShippingThreshold: "",
    restrictions: "",
    returnPolicy: "7-day return",
    exchangePolicy: "Exchange eligible",
  },
  seo: {
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    canonicalUrl: "",
    ogImage: "",
    ogTitle: "",
    ogDescription: "",
    tags: [],
    featured: false,
    newArrival: false,
    bestSeller: false,
  },
  reviews: {
    allowReviews: true,
    averageRating: 0,
    totalReviews: 0,
    moderation: "manual",
  },
  related: {
    relatedProducts: [],
    frequentlyBoughtTogether: [],
    crossSell: [],
    upSell: [],
  },
  advanced: {
    productType: "simple",
    customFields: "",
    badges: [],
    preOrderEnabled: false,
    preOrderReleaseDate: undefined,
    inventoryTracking: true,
    soldIndividually: false,
    purchaseNote: "",
  },
  scheduling: {
    availableFrom: undefined,
    availableUntil: undefined,
    seasonal: false,
    limitedEdition: false,
  },
  admin: {
    addedBy: "",
    dateAdded: undefined,
    lastModifiedBy: "",
    lastModifiedDate: undefined,
    notes: "",
  },
});


