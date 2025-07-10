// Dashboard controller: business logic for dashboard endpoints

exports.getSummary = async (req, res) => {
  res.json({
    summary: {
      totalSales: 125000,
      ordersToday: 87,
      activeUsers: 312,
      lowStock: 9
    },
    details: {
      totalSales: [
        { orderId: 'ORD001', amount: 1200, date: '2025-07-01' },
        { orderId: 'ORD002', amount: 800, date: '2025-07-01' }
      ],
      ordersToday: [
        { orderId: 'ORD003', user: 'Alice', status: 'Delivered', amount: 300 },
        { orderId: 'ORD004', user: 'Bob', status: 'Pending', amount: 150 }
      ],
      activeUsers: [
        { userId: 'U001', name: 'Alice', lastActive: '2025-07-01T10:00:00Z' },
        { userId: 'U002', name: 'Bob', lastActive: '2025-07-01T09:30:00Z' }
      ],
      lowStock: [
        { productId: 'P001', name: 'Widget A', stock: 2 },
        { productId: 'P002', name: 'Widget B', stock: 1 }
      ]
    }
  });
};

exports.getTrends = async (req, res) => {
  res.json({
    labels: ['2025-06-25', '2025-06-26', '2025-06-27', '2025-06-28', '2025-06-29', '2025-06-30', '2025-07-01'],
    sales: [12000, 15000, 11000, 17000, 14000, 16000, 12500],
    orders: [80, 95, 70, 110, 90, 100, 87]
  });
};

exports.getOrderStatus = async (req, res) => {
  res.json({
    labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    values: [12, 8, 15, 45, 7],
    details: {
      Pending: [
        { orderId: 'ORD010', user: 'Charlie', amount: 200, date: '2025-07-01' }
      ],
      Processing: [
        { orderId: 'ORD011', user: 'Dave', amount: 350, date: '2025-07-01' }
      ]
    }
  });
};

exports.getMetrics = async (req, res) => {
  res.json({
    topProducts: [
      { productId: 'P001', name: 'Widget A', sales: 5000 },
      { productId: 'P002', name: 'Widget B', sales: 4200 }
    ],
    topSellers: [
      { sellerId: 'S001', name: 'Seller X', sales: 12000 },
      { sellerId: 'S002', name: 'Seller Y', sales: 9500 }
    ],
    revenueByCategory: [
      { category: 'Electronics', revenue: 30000 },
      { category: 'Clothing', revenue: 18000 }
    ]
  });
};

exports.getActivities = async (req, res) => {
  res.json([
    { type: 'order', message: 'Order ORD001 placed by Alice', timestamp: '2025-07-01T10:05:00Z' },
    { type: 'user', message: 'User Bob registered', timestamp: '2025-07-01T09:50:00Z' },
    { type: 'product', message: 'Product Widget A low on stock', timestamp: '2025-07-01T09:30:00Z' }
  ]);
};
