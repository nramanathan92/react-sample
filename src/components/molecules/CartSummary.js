import Text from '../atoms/Text';
import Button from '../atoms/Button';
import styles from './CartSummary.module.css';

const CartSummary = ({ total, onCheckout }) => (
  <aside className={styles.container} aria-label="Cart summary">
    <div className={styles.totalRow}>
      <Text as="strong">Estimated Total</Text>
      <Text as="span" style={{ fontWeight: 'bold', fontSize: 18 }}>${total}</Text>
    </div>
    <Text as="p" className={styles.note}>Tax calculated in checkout</Text>
    <Button onClick={onCheckout} ariaLabel="Checkout" style={{ width: '100%', padding: '12px 0', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: 16 }}>
      CHECKOUT
    </Button>
  </aside>
);

export default CartSummary; 