import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`http://localhost:4001/products/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setResults(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to search');
        setLoading(false);
      });
  }, [query]);

  if (!query) return <div className="p-8 text-center">No search query provided.</div>;
  if (loading) return <div className="p-8 text-center">Searching...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 flex flex-col items-center">
      <div className="w-full max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-pink-700">Search Results for "{query}"</h1>
        {results.length === 0 ? (
          <div className="text-gray-500">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {results.map(p => (
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
