import HeroSection from '../sections/HeroSection';
import BrandsSection from '../sections/BrandsSection';
import CategorySection from '../sections/CategorySection';
import HotDealsSection from '../sections/HotDealsSection';
import FeaturedSection from '../sections/FeaturedSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-indigo-100 flex flex-col items-center">
      <div className="w-full max-w-6xl px-2 md:px-4 py-6 md:py-10">
        <HeroSection />
        <BrandsSection />
        <CategorySection />
        <HotDealsSection />
        <FeaturedSection />
      </div>
    </div>
  );
}
