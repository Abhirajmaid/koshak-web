import { products, categories } from '@/data/products';
import CategoryClient from './CategoryClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = categories.find(c => c.id === id);
  
  if (!category) {
    return {
      title: 'Category Not Found - Koshak',
      description: 'The requested category could not be found.'
    };
  }

  return {
    title: `${category.name} - Premium Indo-Western Collection | Koshak`,
    description: category.description,
    keywords: `${category.name}, Indian clothing, ethnic wear, traditional wear, ${category.id}`,
    openGraph: {
      title: `${category.name} - Koshak`,
      description: category.description,
      images: [category.image],
      type: 'website',
    },
  };
}

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const resolvedParams = await params;
  return <CategoryClient params={resolvedParams} />;
};

export default CategoryPage;
