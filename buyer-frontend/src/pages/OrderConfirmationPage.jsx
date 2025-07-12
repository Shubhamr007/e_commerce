import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmationPage.css';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Order data can be passed via navigation state after checkout
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="order-confirmation-main flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-semibold mb-4">No order found</h2>
        <button
          className="order-confirmation-btn"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="order-confirmation-main">
      <div className="order-confirmation-card">
        <h1 className="order-confirmation-title">Order Confirmed!</h1>
        <p className="mb-2">Thank you for your purchase. Your order has been placed successfully.</p>
        <div className="mb-4">
          <span className="font-semibold">Order ID:</span> #{order.id}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Shipping Address:</span> {order.address}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Order Total:</span> ₹{order.total}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Order Items:</span>
          <ul className="list-disc ml-6">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} x {item.quantity} @ ₹{item.price} each
              </li>
            ))}
          </ul>
        </div>
        <button
          className="order-confirmation-btn"
          onClick={() => navigate('/orders')}
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}
