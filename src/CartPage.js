import styles from './CartPage.module.css';
import CartList from './components/organisms/CartList';
import CartSidebar from './components/organisms/CartSidebar';

const CartPage = ({ cart, onQuantityChange, onRemove, onCheckout }) => {
  const total = cart
    .reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0)
    .toFixed(2);

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <CartList items={cart} onQuantityChange={onQuantityChange} onRemove={onRemove} />
        <CartSidebar total={total} onCheckout={onCheckout} />
      </div>
    </main>
  );
};

export default CartPage;