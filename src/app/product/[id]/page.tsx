import { products } from '@/data/products';
import ProductClient from './ProductClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return {
      title: 'Product Not Found - Koshak',
      description: 'The requested product could not be found.'
    };
  }

  return {
    title: `${product.name} - ₹${product.price.toLocaleString()} | Koshak`,
    description: product.detailedDescription,
    keywords: `${product.name}, ${product.fabric}, ${product.tags.join(', ')}, Indian clothing, ethnic wear`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
      type: 'website',
      siteName: 'Koshak',
      url: `https://koshak.com/product/${product.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'INR',
      'product:availability': product.inStock ? 'in stock' : 'out of stock',
      'product:condition': 'new',
      'product:brand': 'Koshak',
    }
  };
}

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const resolvedParams = await params;
  return <ProductClient params={resolvedParams} />;
};

export default ProductPage;