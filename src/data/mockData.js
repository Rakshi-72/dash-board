export const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@mail.com', status: 'active', role: 'Admin' },
  { id: 2, name: 'Brian Lee', email: 'brian@mail.com', status: 'blocked', role: 'Editor' },
  { id: 3, name: 'Carmen Diaz', email: 'carmen@mail.com', status: 'active', role: 'Customer' },
  { id: 4, name: 'David Kim', email: 'david@mail.com', status: 'active', role: 'Customer' },
]

export const products = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1499, image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=400' },
  { id: 2, name: 'Office Chair', category: 'Furniture', price: 299, image: 'https://images.unsplash.com/photo-1582582494700-6f87820b9b35?w=400' },
  { id: 3, name: 'Smart Watch', category: 'Wearables', price: 199, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
]

export const orders = [
  { id: 'ORD-1001', user: 'Alice Johnson', total: 499, status: 'pending', date: '2026-04-18' },
  { id: 'ORD-1002', user: 'Carmen Diaz', total: 249, status: 'shipped', date: '2026-04-17' },
  { id: 'ORD-1003', user: 'David Kim', total: 999, status: 'delivered', date: '2026-04-15' },
]

export const transactions = [
  { id: 'TX-901', orderId: 'ORD-1001', amount: 499, method: 'Card', status: 'success', date: '2026-04-18' },
  { id: 'TX-902', orderId: 'ORD-1002', amount: 249, method: 'PayPal', status: 'success', date: '2026-04-17' },
  { id: 'TX-903', orderId: 'ORD-1003', amount: 999, method: 'Card', status: 'pending', date: '2026-04-15' },
]

export const salesTrend = [12000, 18000, 16000, 23000, 21000, 26000, 31000]
export const revenueByCategory = [40, 22, 18, 20]
