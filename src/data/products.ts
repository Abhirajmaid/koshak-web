import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'oversized-tshirts',
    name: 'Oversized T-Shirts',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop',
    description: 'Relaxed, drapey fits with premium cotton blends for all-day comfort.'
  },
  {
    id: 'tshirts',
    name: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop',
    description: 'Everyday classic tees in soft fabrics and crisp fits.'
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1520974759018-6f61a147fbd1?q=80&w=1200&auto=format&fit=crop',
    description: 'Cozy fleece and French terry hoodies built for year-round layering.'
  }
];

export const products: Product[] = [
  // Oversized T-Shirts
  {
    id: 'os-001',
    name: 'Oversized Heavyweight Tee - Black',
    price: 999,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'oversized-tshirts',
    description: 'Boxy silhouette, dropped shoulders, 240 GSM combed cotton.',
    detailedDescription: 'Crafted from dense 240 GSM combed cotton, this oversized tee delivers a premium drape with a soft hand feel. Finished with a ribbed neck and double-needle hems for durability.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 214,
    fabric: '240 GSM Combed Cotton',
    occasion: ['Casual', 'Streetwear', 'Daily'],
    careInstructions: ['Machine wash cold', 'Do not bleach', 'Tumble dry low', 'Warm iron inside out'],
    features: ['Oversized fit', 'Dropped shoulders', 'Heavyweight fabric'],
    measurements: {
      'S': { chest: '42"', length: '27"' },
      'M': { chest: '44"', length: '28"' },
      'L': { chest: '46"', length: '29"' },
      'XL': { chest: '48"', length: '30"' },
      'XXL': { chest: '50"', length: '31"' }
    },
    specifications: {
      'Neck': '1x1 rib',
      'Fabric': '100% cotton',
      'GSM': '240'
    },
    tags: ['oversized', 'heavyweight', 'streetwear'],
    sku: 'KSK-OS-001',
    weight: '320g',
    origin: 'Made in India'
  },
  {
    id: 'os-002',
    name: 'Oversized Graphic Tee - Off White',
    price: 1099,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1526991756431-99b6a5f6d6b8?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1526991756431-99b6a5f6d6b8?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'oversized-tshirts',
    description: 'Soft-hand screen print on breathable heavy cotton.',
    detailedDescription: 'A relaxed tee with a vintage-inspired graphic print. Pre-shrunk fabric minimizes wash shrinkage.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Off White'],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 132,
    fabric: '220 GSM Cotton',
    occasion: ['Casual'],
    careInstructions: ['Wash inside out', 'Do not iron print'],
    features: ['Oversized fit', 'Graphic print'],
    measurements: {
      'S': { chest: '42"', length: '27"' },
      'M': { chest: '44"', length: '28"' },
      'L': { chest: '46"', length: '29"' },
      'XL': { chest: '48"', length: '30"' }
    },
    specifications: {
      'Print': 'Screen print',
      'GSM': '220'
    },
    tags: ['oversized', 'graphic'],
    sku: 'KSK-OS-002',
    weight: '300g',
    origin: 'Made in India'
  },
  {
    id: 'os-003',
    name: 'Oversized Washed Tee - Faded Blue',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'oversized-tshirts',
    description: 'Pigment-dyed vintage wash with soft drape.',
    detailedDescription: 'Enzyme and silicon washed for a broken-in feel from day one. Boxy silhouette with dropped shoulders.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Faded Blue'],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewCount: 88,
    fabric: '230 GSM Cotton',
    occasion: ['Casual'],
    careInstructions: ['Wash separately for first 2 washes'],
    features: ['Pigment dyed', 'Oversized'],
    measurements: {
      'S': { chest: '42"', length: '27"' },
      'M': { chest: '44"', length: '28"' },
      'L': { chest: '46"', length: '29"' },
      'XL': { chest: '48"', length: '30"' }
    },
    specifications: {
      'Dye': 'Pigment',
      'GSM': '230'
    },
    tags: ['washed', 'oversized'],
    sku: 'KSK-OS-003',
    weight: '305g',
    origin: 'Made in India'
  },

  // Regular T-Shirts
  {
    id: 'ts-001',
    name: 'Classic Crewneck Tee - White',
    price: 699,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'tshirts',
    description: 'Everyday tee in breathable combed cotton.',
    detailedDescription: 'Midweight 180 GSM cotton with a tailored regular fit. Rib neckline retains shape wash after wash.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White'],
    inStock: true,
    featured: true,
    rating: 4.5,
    reviewCount: 321,
    fabric: '180 GSM Cotton',
    occasion: ['Daily', 'Casual'],
    careInstructions: ['Machine wash cold'],
    features: ['Regular fit', 'Breathable'],
    measurements: {
      'S': { chest: '38"', length: '26"' },
      'M': { chest: '40"', length: '27"' },
      'L': { chest: '42"', length: '28"' },
      'XL': { chest: '44"', length: '29"' },
      'XXL': { chest: '46"', length: '30"' }
    },
    specifications: {
      'Fabric': '100% cotton',
      'GSM': '180'
    },
    tags: ['basic', 'tee'],
    sku: 'KSK-TS-001',
    weight: '220g',
    origin: 'Made in India'
  },
  {
    id: 'ts-002',
    name: 'Pocket Tee - Charcoal',
    price: 799,
    image: 'https://images.unsplash.com/photo-1520975592478-08b22a36f2d3?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1520975592478-08b22a36f2d3?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'tshirts',
    description: 'Regular fit tee with chest pocket and soft wash.',
    detailedDescription: 'Comfort-washed for a lived-in feel. Subtle pocket detail for everyday utility.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal'],
    inStock: true,
    featured: false,
    rating: 4.4,
    reviewCount: 101,
    fabric: '190 GSM Cotton',
    occasion: ['Daily'],
    careInstructions: ['Machine wash cold'],
    features: ['Pocket', 'Regular fit'],
    measurements: {
      'S': { chest: '38"', length: '26"' },
      'M': { chest: '40"', length: '27"' },
      'L': { chest: '42"', length: '28"' },
      'XL': { chest: '44"', length: '29"' }
    },
    specifications: {
      'Fabric': '100% cotton',
      'GSM': '190'
    },
    tags: ['pocket', 'tee'],
    sku: 'KSK-TS-002',
    weight: '230g',
    origin: 'Made in India'
  },
  {
    id: 'ts-003',
    name: 'Ringer Tee - Navy/White',
    price: 849,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'tshirts',
    description: 'Retro contrast rib neck and sleeves.',
    detailedDescription: 'A classic ringer tee with contrast ribbing and a clean tailored fit.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy/White'],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviewCount: 77,
    fabric: '185 GSM Cotton',
    occasion: ['Casual'],
    careInstructions: ['Machine wash cold'],
    features: ['Ringer rib'],
    measurements: {
      'S': { chest: '38"', length: '26"' },
      'M': { chest: '40"', length: '27"' },
      'L': { chest: '42"', length: '28"' },
      'XL': { chest: '44"', length: '29"' }
    },
    specifications: {
      'Fabric': '100% cotton',
      'GSM': '185'
    },
    tags: ['ringer', 'tee'],
    sku: 'KSK-TS-003',
    weight: '225g',
    origin: 'Made in India'
  },

  // Hoodies
  {
    id: 'hd-001',
    name: 'Classic Fleece Hoodie - Grey',
    price: 1799,
    originalPrice: 2199,
    image: 'https://images.unsplash.com/photo-1520971347561-4f0a0a1e496a?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1520971347561-4f0a0a1e496a?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'hoodies',
    description: 'Brushed fleece interior with kangaroo pocket and drawstring hood.',
    detailedDescription: 'Soft cotton-rich fleece with a cozy brushed back. Rib cuffs and hem for a snug fit.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Grey'],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 189,
    fabric: '320 GSM Cotton-Poly Fleece',
    occasion: ['Casual', 'Athleisure'],
    careInstructions: ['Machine wash cold', 'Tumble dry low'],
    features: ['Kangaroo pocket', 'Drawstring hood'],
    measurements: {
      'S': { chest: '40"', length: '26.5"' },
      'M': { chest: '42"', length: '27.5"' },
      'L': { chest: '44"', length: '28.5"' },
      'XL': { chest: '46"', length: '29.5"' },
      'XXL': { chest: '48"', length: '30.5"' }
    },
    specifications: {
      'Fabric': 'Cotton/Poly',
      'GSM': '320',
      'Pockets': 'Kangaroo'
    },
    tags: ['hoodie', 'fleece'],
    sku: 'KSK-HD-001',
    weight: '620g',
    origin: 'Made in India'
  },
  {
    id: 'hd-002',
    name: 'Zip Hoodie - Black',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1520974722077-c7ad8e5ad208?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1520974722077-c7ad8e5ad208?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'hoodies',
    description: 'Full-zip hoodie with metal zipper and jersey-lined hood.',
    detailedDescription: 'Midweight loopback fabric for breathable warmth. Clean minimal branding.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 95,
    fabric: '300 GSM Loopback',
    occasion: ['Casual'],
    careInstructions: ['Machine wash cold'],
    features: ['Metal zipper', 'Jersey-lined hood'],
    measurements: {
      'S': { chest: '40"', length: '26.5"' },
      'M': { chest: '42"', length: '27.5"' },
      'L': { chest: '44"', length: '28.5"' },
      'XL': { chest: '46"', length: '29.5"' }
    },
    specifications: {
      'Fabric': 'Cotton/Poly',
      'GSM': '300'
    },
    tags: ['zip', 'hoodie'],
    sku: 'KSK-HD-002',
    weight: '600g',
    origin: 'Made in India'
  },
  {
    id: 'hd-003',
    name: 'Oversized Hoodie - Sand',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'hoodies',
    description: 'Roomy silhouette with dropped shoulders and plush fleece.',
    detailedDescription: 'A cozy oversized hoodie with a tonal drawcord, front pocket and rib trims. Ideal for travel and lounging.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Sand'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 141,
    fabric: '330 GSM Fleece',
    occasion: ['Casual', 'Lounge'],
    careInstructions: ['Machine wash cold', 'Do not bleach'],
    features: ['Oversized fit', 'Plush fleece'],
    measurements: {
      'S': { chest: '44"', length: '27.5"' },
      'M': { chest: '46"', length: '28.5"' },
      'L': { chest: '48"', length: '29.5"' },
      'XL': { chest: '50"', length: '30.5"' }
    },
    specifications: {
      'Fabric': 'Cotton/Poly',
      'GSM': '330'
    },
    tags: ['oversized', 'hoodie'],
    sku: 'KSK-HD-003',
    weight: '650g',
    origin: 'Made in India'
  }
];