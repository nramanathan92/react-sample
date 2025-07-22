import CartSummary from '../molecules/CartSummary';
import styles from './CartSidebar.module.css';

const CartSidebar = ({ total, onCheckout }) => (
  <aside className={styles.container}>
    <CartSummary total={total} onCheckout={onCheckout} />
  </aside>
);

export default CartSidebar; 