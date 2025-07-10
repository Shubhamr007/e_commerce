import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryCarousel() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4001/categories')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-2 text-indigo-700">Shop by Category</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {categories.length === 0 && <div className="text-gray-400">No categories found.</div>}
        {categories.map(cat => (
          <div
            key={cat.id}
            className="min-w-[120px] bg-white rounded-xl shadow-md border border-yellow-100 hover:border-pink-400 transition-all duration-200 ease-in-out p-4 flex flex-col items-center cursor-pointer hover:bg-pink-50"
            onClick={() => navigate(`/category/${cat.id}`)}
            style={{ boxShadow: '0 2px 12px 0 #f8b50022' }}
          >
            <img src={cat.imageUrl || '/vite.svg'} alt={cat.name} className="w-12 h-12 object-contain mb-2" />
            <span className="font-medium text-sm text-center">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
