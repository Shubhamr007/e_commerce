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
    <form
      onSubmit={handleSearch}
      className={`flex items-center gap-2 w-full${asHeader ? '' : ' mb-6'}`}
      style={{
        boxShadow: '0 2px 12px 0 #f8b50022',
        borderRadius: '1rem',
        background: '#fff',
        padding: '0.5rem 1rem',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <input
        className="flex-1 border-0 rounded-l px-4 py-3 focus:outline-none text-lg bg-transparent"
        type="text"
        placeholder="Search for products, brands and more..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ background: 'none' }}
      />
      <button
        className="bg-pink-600 text-white px-6 py-3 rounded-r flex items-center gap-2 text-lg font-semibold hover:bg-pink-700 transition"
        type="submit"
      >
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
