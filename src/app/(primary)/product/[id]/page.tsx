import ProductClient from "./ProductClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Koshak Product - ${id}`,
    description: "Discover premium Indo-Western fashion from Koshak.",
  };
}

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    productId?: string;
  }>;
}

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <ProductClient
      params={resolvedParams}
      searchParams={resolvedSearchParams}
    />
  );
};

export default ProductPage;