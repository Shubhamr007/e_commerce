import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 pt-16">
      {/* Use the screenshot image as illustration */}
      <img
        src="/assets/empty-cart-screenshot.png"
        alt="Empty Cart"
        className="w-[400px] h-auto mb-6 rounded shadow"
        style={{ background: '#fff' }}
      />
      <h2 className="text-xl font-semibold mb-2">Your cart is empty!</h2>
      <p className="mb-4 text-gray-600">Add items to it now.</p>
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded shadow"
        onClick={() => navigate('/')}
      >
        Shop now
      </button>
    </div>
  );
}
