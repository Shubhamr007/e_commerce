import CategoryCarousel from '../components/CategoryCarousel';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

export default function HomePage({ products, onAddToCart, onViewDetails }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-indigo-100 flex flex-col items-center">
      <div className="w-full max-w-5xl px-4 py-8">
        <SearchBar />
        <CategoryCarousel />
        <h2 className="text-2xl font-bold mt-8 mb-4 text-pink-700">Featured Products</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {products && products.length > 0 ? (
            products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            ))
          ) : (
            <div className="text-gray-400">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
