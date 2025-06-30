import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Cart from './Cart';
import CartPage from './CartPage';

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
  return <CartPage />;
}

export default App;
