import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`http://localhost:4001/categories/${id}`).then(res => res.json()),
      fetch(`http://localhost:4001/categories/${id}/products`).then(res => res.json()),
    ])
      .then(([cat, prods]) => {
        setCategory(cat);
        setProducts(Array.isArray(prods) ? prods : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load category');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!category) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 flex flex-col items-center">
      <div className="w-full max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700">{category.name}</h1>
        {products.length === 0 ? (
          <div className="text-gray-500">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer hover:bg-indigo-50 transition"
                onClick={() => window.location.href = `/product/${p.id}`}
              >
                <img src={p.imageUrl || '/vite.svg'} alt={p.name} className="w-24 h-24 object-contain mb-2" />
                <span className="font-medium text-base text-center">{p.name}</span>
                <span className="text-pink-700 font-bold">${p.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
