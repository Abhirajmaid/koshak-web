import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'kurtas',
    name: 'Kurtas & Kurtis',
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Traditional and contemporary kurtas for every occasion. Discover our collection of handcrafted kurtas made from premium fabrics with intricate embroidery and modern cuts.'
  },
  {
    id: 'lehengas',
    name: 'Lehengas',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Elegant lehengas for weddings and festivals. From bridal lehengas with heavy work to party wear with contemporary designs, find your perfect outfit.'
  },
  {
    id: 'sarees',
    name: 'Sarees',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Timeless sarees in various fabrics and designs. Explore our collection of silk, cotton, and designer sarees perfect for every occasion.'
  },
  {
    id: 'sherwanis',
    name: 'Sherwanis',
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Royal sherwanis for grooms and special occasions. Handcrafted with premium fabrics and traditional embroidery for the perfect royal look.'
  },
  {
    id: 'indo-western',
    name: 'Indo-Western',
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Fusion wear blending traditional and modern styles. Contemporary designs that combine Indian aesthetics with western silhouettes.'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Traditional jewelry and accessories to complete your ethnic look. From kundan sets to statement pieces, find the perfect accessories.'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Royal Maroon Silk Kurta',
    price: 2499,
    originalPrice: 3499,
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    category: 'kurtas',
    description: 'Luxurious silk kurta with intricate golden embroidery and traditional motifs.',
    detailedDescription: 'This exquisite Royal Maroon Silk Kurta is a masterpiece of traditional Indian craftsmanship. Made from premium quality mulberry silk, it features intricate golden zardozi embroidery with paisley and floral motifs. The kurta has a classic straight cut with a comfortable fit, making it perfect for festivals, weddings, and special occasions. The rich maroon color symbolizes prosperity and elegance, while the golden threadwork adds a regal touch.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Maroon', 'Navy Blue', 'Emerald Green'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 127,
    fabric: 'Pure Mulberry Silk',
    occasion: ['Wedding', 'Festival', 'Party', 'Religious Ceremony'],
    careInstructions: ['Dry clean only', 'Store in cool, dry place', 'Avoid direct sunlight', 'Iron on low heat'],
    features: ['Hand-embroidered golden zardozi work', 'Premium silk fabric', 'Comfortable straight fit', 'Traditional collar design', 'Full sleeves'],
    measurements: {
      'S': { chest: '38"', length: '42"', shoulder: '16"' },
      'M': { chest: '40"', length: '43"', shoulder: '17"' },
      'L': { chest: '42"', length: '44"', shoulder: '18"' },
      'XL': { chest: '44"', length: '45"', shoulder: '19"' },
      'XXL': { chest: '46"', length: '46"', shoulder: '20"' }
    },
    specifications: {
      'Fabric': 'Pure Mulberry Silk',
      'Work': 'Zardozi Embroidery',
      'Fit': 'Regular',
      'Sleeve': 'Full Sleeve',
      'Collar': 'Band Collar',
      'Pattern': 'Embroidered'
    },
    tags: ['silk', 'embroidered', 'traditional', 'wedding', 'festival'],
    sku: 'KSK-KUR-001',
    weight: '400g',
    origin: 'Handcrafted in Varanasi, India'
  },
  {
    id: '2',
    name: 'Golden Banarasi Lehenga',
    price: 8999,
    originalPrice: 12999,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    category: 'lehengas',
    description: 'Stunning Banarasi lehenga with heavy golden zardozi work and intricate thread embroidery.',
    detailedDescription: 'This magnificent Golden Banarasi Lehenga is a testament to the rich heritage of Indian textile artistry. Crafted from premium silk with authentic Banarasi weaving, it features heavy golden zardozi work with intricate thread embroidery. The lehenga includes a fully lined skirt with can-can for perfect flare, a fitted choli with detailed work, and a matching dupatta. The golden color represents prosperity and is perfect for bridal wear and grand celebrations.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Golden', 'Red', 'Pink'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 89,
    fabric: 'Banarasi Silk',
    occasion: ['Wedding', 'Reception', 'Engagement', 'Festival'],
    careInstructions: ['Dry clean only', 'Store with muslin cloth', 'Avoid perfume contact', 'Handle with care'],
    features: ['Heavy zardozi work', 'Banarasi silk fabric', 'Can-can lining', 'Matching choli and dupatta', 'Bridal quality'],
    measurements: {
      'XS': { waist: '26"', length: '42"' },
      'S': { waist: '28"', length: '42"' },
      'M': { waist: '30"', length: '42"' },
      'L': { waist: '32"', length: '42"' },
      'XL': { waist: '34"', length: '42"' }
    },
    specifications: {
      'Fabric': 'Banarasi Silk',
      'Work': 'Zardozi & Thread Embroidery',
      'Components': '3 Piece Set',
      'Lining': 'Cotton with Can-Can',
      'Closure': 'Side Zip',
      'Dupatta': 'Matching Silk Dupatta'
    },
    tags: ['banarasi', 'bridal', 'golden', 'heavy work', 'wedding'],
    sku: 'KSK-LEH-002',
    weight: '1.2kg',
    origin: 'Handwoven in Varanasi, India'
  },
  {
    id: '3',
    name: 'Elegant Silk Saree',
    price: 4999,
    originalPrice: 6999,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    category: 'sarees',
    description: 'Pure silk saree with traditional paisley motifs and rich golden border.',
    detailedDescription: 'This Elegant Silk Saree embodies the timeless beauty of Indian traditional wear. Handwoven from pure silk by master craftsmen, it features intricate paisley motifs throughout the body and a rich golden border with traditional designs. The saree drapes beautifully and is perfect for formal occasions, festivals, and celebrations. Comes with a matching blouse piece that can be tailored to your measurements.',
    sizes: ['Free Size'],
    colors: ['Deep Red', 'Royal Blue', 'Emerald'],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 156,
    fabric: 'Pure Silk',
    occasion: ['Wedding', 'Festival', 'Party', 'Office', 'Traditional Events'],
    careInstructions: ['Dry clean recommended', 'Can be hand washed gently', 'Iron on medium heat', 'Store folded with tissue paper'],
    features: ['Handwoven pure silk', 'Traditional paisley motifs', 'Rich golden border', 'Matching blouse piece', 'Easy draping'],
    measurements: {
      'Free Size': { length: '5.5 meters', waist: 'Adjustable' }
    },
    specifications: {
      'Fabric': 'Pure Silk',
      'Length': '5.5 meters',
      'Width': '44 inches',
      'Border': 'Woven Golden Border',
      'Blouse': 'Matching Blouse Piece (0.8m)',
      'Weave': 'Traditional Handloom'
    },
    tags: ['silk', 'traditional', 'handwoven', 'paisley', 'golden border'],
    sku: 'KSK-SAR-003',
    weight: '600g',
    origin: 'Handwoven in Kanchipuram, India'
  },
  {
    id: '4',
    name: 'Regal Sherwani Set',
    price: 6999,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    category: 'sherwanis',
    description: 'Complete regal sherwani set with matching churidar and silk dupatta.',
    detailedDescription: 'This Regal Sherwani Set is the epitome of traditional Indian menswear elegance. Crafted from premium silk fabric, it features intricate thread work and golden buttons that add a royal touch. The set includes a perfectly tailored sherwani, matching churidar, and a silk dupatta. The classic cut and rich fabric make it ideal for grooms, wedding guests, and special celebrations.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Cream', 'Maroon', 'Golden'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 94,
    fabric: 'Premium Silk',
    occasion: ['Wedding', 'Engagement', 'Reception', 'Festival', 'Religious Ceremony'],
    careInstructions: ['Dry clean only', 'Store on hangers', 'Avoid moisture', 'Iron with pressing cloth'],
    features: ['Intricate thread work', 'Golden buttons', 'Complete 3-piece set', 'Tailored fit', 'Premium silk fabric'],
    measurements: {
      'S': { chest: '38"', length: '40"', shoulder: '16"' },
      'M': { chest: '40"', length: '41"', shoulder: '17"' },
      'L': { chest: '42"', length: '42"', shoulder: '18"' },
      'XL': { chest: '44"', length: '43"', shoulder: '19"' },
      'XXL': { chest: '46"', length: '44"', shoulder: '20"' }
    },
    specifications: {
      'Fabric': 'Premium Silk',
      'Components': '3 Piece Set',
      'Collar': 'Band Collar',
      'Closure': 'Button Front',
      'Fit': 'Regular Fit',
      'Dupatta': 'Matching Silk Dupatta'
    },
    tags: ['sherwani', 'groom', 'wedding', 'traditional', 'silk'],
    sku: 'KSK-SHE-004',
    weight: '800g',
    origin: 'Tailored in Lucknow, India'
  },
  {
    id: '5',
    name: 'Indo-Western Fusion Dress',
    price: 3499,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    category: 'indo-western',
    description: 'Contemporary fusion dress combining traditional Indian embroidery with modern silhouettes.',
    detailedDescription: 'This Indo-Western Fusion Dress perfectly blends traditional Indian craftsmanship with contemporary fashion. The dress features traditional embroidery work on a modern silhouette with an asymmetrical hemline. Made from premium fabric, it offers comfort and style for the modern woman who appreciates both tradition and contemporary fashion.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviewCount: 73,
    fabric: 'Premium Cotton Blend',
    occasion: ['Party', 'Casual', 'Office', 'Date Night', 'Cocktail'],
    careInstructions: ['Machine wash cold', 'Gentle cycle', 'Do not bleach', 'Iron on low heat'],
    features: ['Traditional embroidery', 'Modern silhouette', 'Asymmetrical hemline', 'Comfortable fit', 'Versatile styling'],
    measurements: {
      'XS': { chest: '32"', waist: '26"', length: '38"' },
      'S': { chest: '34"', waist: '28"', length: '38"' },
      'M': { chest: '36"', waist: '30"', length: '39"' },
      'L': { chest: '38"', waist: '32"', length: '39"' },
      'XL': { chest: '40"', waist: '34"', length: '40"' }
    },
    specifications: {
      'Fabric': 'Cotton Blend',
      'Fit': 'Regular Fit',
      'Sleeve': 'Three Quarter',
      'Neckline': 'Round Neck',
      'Pattern': 'Embroidered',
      'Closure': 'Back Zip'
    },
    tags: ['fusion', 'contemporary', 'embroidered', 'modern', 'versatile'],
    sku: 'KSK-FUS-005',
    weight: '300g',
    origin: 'Designed in Mumbai, India'
  },
  {
    id: '6',
    name: 'Traditional Jewelry Set',
    price: 1999,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    category: 'accessories',
    description: 'Exquisite traditional jewelry set with kundan work necklace, matching earrings, and maang tikka.',
    detailedDescription: 'This Traditional Jewelry Set is a perfect complement to any Indian outfit. Crafted with intricate kundan work, the set includes a statement necklace, matching earrings, and an elegant maang tikka. Each piece features premium quality stones and gold plating, making it perfect for weddings, festivals, and special occasions.',
    sizes: ['Free Size'],
    colors: ['Golden', 'Silver'],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 112,
    fabric: 'Metal with Kundan Work',
    occasion: ['Wedding', 'Festival', 'Party', 'Traditional Events'],
    careInstructions: ['Store in jewelry box', 'Avoid water contact', 'Clean with soft cloth', 'Keep away from perfumes'],
    features: ['Kundan work', 'Gold plating', '3-piece set', 'Premium stones', 'Traditional design'],
    measurements: {
      'Free Size': { length: 'Adjustable' }
    },
    specifications: {
      'Material': 'Brass with Gold Plating',
      'Stones': 'Kundan & Pearls',
      'Components': 'Necklace, Earrings, Maang Tikka',
      'Plating': '18K Gold Plated',
      'Style': 'Traditional Indian',
      'Closure': 'Hook & Eye'
    },
    tags: ['jewelry', 'kundan', 'traditional', 'wedding', 'gold plated'],
    sku: 'KSK-JEW-006',
    weight: '150g',
    origin: 'Crafted in Jaipur, India'
  },
  {
    id: '7',
    name: 'Designer Anarkali Suit',
    price: 4499,
    originalPrice: 6499,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    category: 'kurtas',
    description: 'Elegant Anarkali suit with flowy silhouette and intricate mirror work.',
    detailedDescription: 'This Designer Anarkali Suit combines traditional elegance with contemporary style. The flowy silhouette creates a graceful look, while intricate mirror work adds sparkle and glamour. The floor-length design with full sleeves offers modest coverage while maintaining a fashionable appeal. Complete with matching churidar and dupatta.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Turquoise', 'Purple'],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 98,
    fabric: 'Georgette',
    occasion: ['Wedding', 'Party', 'Festival', 'Reception'],
    careInstructions: ['Dry clean preferred', 'Hand wash gently', 'Iron on low heat', 'Store carefully'],
    features: ['Mirror work', 'Flowy silhouette', 'Floor-length', 'Full sleeves', '3-piece set'],
    measurements: {
      'S': { chest: '36"', length: '52"', shoulder: '14"' },
      'M': { chest: '38"', length: '52"', shoulder: '15"' },
      'L': { chest: '40"', length: '52"', shoulder: '16"' },
      'XL': { chest: '42"', length: '52"', shoulder: '17"' }
    },
    specifications: {
      'Fabric': 'Georgette',
      'Work': 'Mirror Work',
      'Components': '3 Piece Set',
      'Fit': 'Flowy',
      'Sleeve': 'Full Sleeve',
      'Length': 'Floor Length'
    },
    tags: ['anarkali', 'mirror work', 'georgette', 'party wear', 'traditional'],
    sku: 'KSK-ANA-007',
    weight: '500g',
    origin: 'Designed in Delhi, India'
  },
  {
    id: '8',
    name: 'Bridal Red Lehenga',
    price: 15999,
    originalPrice: 22999,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    category: 'lehengas',
    description: 'Stunning bridal red lehenga with heavy zardozi and stone work.',
    detailedDescription: 'This Bridal Red Lehenga is the ultimate choice for your special day. Crafted from premium silk with heavy zardozi work and stone embellishments, it features intricate golden embroidery that catches the light beautifully. The rich red color symbolizes love and prosperity, making it perfect for brides. The lehenga includes a heavily worked choli and matching dupatta.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Red', 'Maroon'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 67,
    fabric: 'Premium Silk',
    occasion: ['Wedding', 'Bridal', 'Reception'],
    careInstructions: ['Dry clean only', 'Professional storage', 'Handle with extreme care', 'Avoid direct sunlight'],
    features: ['Heavy zardozi work', 'Stone embellishments', 'Bridal quality', 'Premium silk', 'Traditional red'],
    measurements: {
      'XS': { waist: '26"', length: '42"' },
      'S': { waist: '28"', length: '42"' },
      'M': { waist: '30"', length: '42"' },
      'L': { waist: '32"', length: '42"' },
      'XL': { waist: '34"', length: '42"' }
    },
    specifications: {
      'Fabric': 'Premium Silk',
      'Work': 'Heavy Zardozi & Stone Work',
      'Components': '3 Piece Bridal Set',
      'Color': 'Traditional Bridal Red',
      'Lining': 'Premium Cotton',
      'Dupatta': 'Heavy Worked Dupatta'
    },
    tags: ['bridal', 'red lehenga', 'heavy work', 'wedding', 'traditional'],
    sku: 'KSK-BRI-008',
    weight: '1.5kg',
    origin: 'Handcrafted in Rajasthan, India'
  }
];