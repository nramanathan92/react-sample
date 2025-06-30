import React, { useState } from 'react';
import CartList from './components/organisms/CartList';
import CartSidebar from './components/organisms/CartSidebar';

// Mock data for demonstration
const initialCart = [
  {
    id: 1,
    product: {
      name: 'Product 1',
      link: '#',
      imageSrc: 'https://via.placeholder.com/120x120/4caf50/ffffff?text=Product+1',
      imageAlt: 'Product 1',
      price: '10.99',
    },
    quantity: 4,
  },
  {
    id: 2,
    product: {
      name: 'Product 1',
      link: '#',
      imageSrc: 'https://via.placeholder.com/120x120/4caf50/ffffff?text=Product+1',
      imageAlt: 'Product 1',
      price: '10.99',
    },
    quantity: 1,
  },
  {
    id: 3,
    product: {
      name: 'Product 2',
      link: '#',
      imageSrc: 'https://via.placeholder.com/120x120/2196f3/ffffff?text=Product+2',
      imageAlt: 'Product 2',
      price: '20.99',
    },
    quantity: 1,
  },
];

const CartPage = () => {
  const [cart, setCart] = useState(initialCart);

  const handleQuantityChange = (id, newQuantity) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, 99)) }
          : item
      )
    );
  };

  const handleRemove = id => {
    setCart(cart => cart.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout!');
  };

  const total = cart
    .reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0)
    .toFixed(2);

  return (
    <main style={{ padding: 24, background: '#f5f5f5', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          maxWidth: 1200,
          margin: '0 auto',
          gap: 32,
        }}
      >
        <CartList items={cart} onQuantityChange={handleQuantityChange} onRemove={handleRemove} />
        <CartSidebar total={total} onCheckout={handleCheckout} />
      </div>
    </main>
  );
};

export default CartPage; 