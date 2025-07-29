import React from 'react';
import styles from './CartPage.module.css';
import CartList from './components/organisms/CartList';
import CartSidebar from './components/organisms/CartSidebar';
import { useCartStore } from './store/cartStore';
import withCustomRender from './withCustomRender';

const CartPage = () => {
  const { cart, handleCheckout } = useCartStore();
  
  const total = cart
    .reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0)
    .toFixed(2);

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        gggggg
        <CartList />
        <CartSidebar total={total} onCheckout={handleCheckout} />
      </div>
    </main>
  );
};

export default withCustomRender(CartPage);