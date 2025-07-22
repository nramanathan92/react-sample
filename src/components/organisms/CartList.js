import React from 'react';
import CartItem from '../molecules/CartItem';
import Text from '../atoms/Text';
import styles from './CartList.module.css';

const CartList = ({ items, onQuantityChange, onRemove }) => (
  <section aria-label="Cart items" className={styles.container}>
    <Text as="h1" className={styles.heading}>
      My Cart ({items.length} item{items.length !== 1 ? 's' : ''})
    </Text>
    {items.map((item, idx) => (
      <CartItem
        key={item.id}
        product={item.product}
        quantity={item.quantity}
        onDecrease={() => onQuantityChange(item.id, item.quantity - 1)}
        onIncrease={() => onQuantityChange(item.id, item.quantity + 1)}
        onQuantityChange={e => onQuantityChange(item.id, Number(e.target.value))}
        onRemove={() => onRemove(item.id)}
      />
    ))}
  </section>
);

export default CartList; 