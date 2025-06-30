import ProductDetailCard from '../components/ProductDetailCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetailPage({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4001/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 flex flex-col items-center">
      <ProductDetailCard product={product} onAddToCart={onAddToCart} />
    </div>
  );
}
