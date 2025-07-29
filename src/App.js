import './App.css';
import CartPage from './CartPage';
import { useCartStore } from './store/cartStore';
import { useEffect } from 'react';

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

function App() {
  const { cart, handleQuantityChange, handleRemove, handleCheckout, initializeCart } = useCartStore();
  
  // Initialize cart on component mount
  useEffect(() => {
    initializeCart(initialCart);
  }, [initializeCart]);

  return (
    <CartPage
      cart={cart}
      onQuantityChange={handleQuantityChange}
      onRemove={handleRemove}
      onCheckout={handleCheckout}
    />
  );
}

export default App;
