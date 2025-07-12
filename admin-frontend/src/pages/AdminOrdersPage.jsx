import React from 'react';
import AppFrame from '../components/AppFrame';
import AdminOrdersManager from '../components/AdminOrdersManager';

export default function AdminOrdersPage() {
  return (
    <AppFrame title="Order Management">
      <AdminOrdersManager />
    </AppFrame>
  );
}
