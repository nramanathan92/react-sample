import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Cart from './Cart';
import CartPage from './CartPage';
import { useState } from 'react';

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

function Home() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React !!TEST
      </a>
      <br />
      <Link to="/cart">Go to Cart</Link>
    </header>
  );
}

function App() {
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
