import { categories } from '@/data/products';
import CategoryClient from './CategoryClient';
import { formatCategoryLabel, normalizeCategoryId } from '@/utils/category';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const fallback = categories.find(
    (category) => normalizeCategoryId(category.id) === normalizeCategoryId(decodedId),
  );
  const categoryName = fallback?.name ?? formatCategoryLabel(decodedId);
  const categoryDescription =
    fallback?.description ??
    `Explore ${categoryName.toLowerCase()} from Koshak. Discover premium designs with the same great experience.`;

  return {
    title: `${categoryName} - Premium Collection | Koshak`,
    description: categoryDescription,
    keywords: `${categoryName}, Indian clothing, ethnic fashion, ${id}`,
    openGraph: {
      title: `${categoryName} - Koshak`,
      description: categoryDescription,
      images: fallback?.image ? [fallback.image] : undefined,
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
