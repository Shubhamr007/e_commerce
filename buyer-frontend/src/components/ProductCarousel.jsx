import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCarousel({ type }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4001/products?type=${type}`)
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, [type]);

  return (
    <div className="w-full px-4">
      <h2 className="text-xl font-bold mb-2 text-gray-800 capitalize">{type} Products</h2>

      {products.length === 0 ? (
        <div className="text-gray-500 text-sm">No products found.</div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-100">
          {products.map((p) => (
            <div
              key={p.id}
              className="min-w-[180px] md:min-w-[220px] bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 hover:border-indigo-400 transition-all duration-200 ease-in-out p-4 flex flex-col items-center justify-center cursor-pointer snap-start"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <img
                src={p.imageUrl || '/vite.svg'}
                alt={p.name}
                className="w-24 h-24 object-contain mb-3"
                onError={(e) => (e.target.src = '/vite.svg')}
              />
              <div className="text-center">
                <h3 className="text-base font-semibold text-gray-700 truncate">{p.name}</h3>
                <p className="text-pink-600 font-bold mt-1">${Number(p.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
