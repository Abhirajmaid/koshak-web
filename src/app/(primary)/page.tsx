import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryShowcase from '@/components/CategoryShowcase';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <TestimonialsSection />
    </div>
  );
}