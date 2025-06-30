import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ asHeader }) {
  const [query, setQuery] = useState('');
  let navigate;
  try {
    // Only call useNavigate if inside a Router
    navigate = useNavigate();
  } catch {
    navigate = null;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() && navigate) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center gap-2 w-full${asHeader ? '' : ' mb-6'}`}>
      <input
        className="flex-1 border border-pink-200 rounded-l px-4 py-2 focus:outline-none focus:border-pink-400"
        type="text"
        placeholder="Search for products, brands and more..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="bg-pink-600 text-white px-4 py-2 rounded-r flex items-center gap-2" type="submit">
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
