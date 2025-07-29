import React from 'react';
import CartItem from '../molecules/CartItem';
import Text from '../atoms/Text';
import { useCartStore } from '../../store/cartStore';
import styles from './CartList.module.css';

const CartList = () => {
  const { cart, handleQuantityChange, handleRemove } = useCartStore();

  return (
    <section aria-label="Cart items" className={styles.container}>
      <Text as="h1" className={styles.heading}>
        My Cart ({cart.length} item{cart.length !== 1 ? 's' : ''})
      </Text>
      {cart.map((item, idx) => (
        <CartItem
          key={item.id}
          product={item.product}
          quantity={item.quantity}
          onDecrease={() => handleQuantityChange(item.id, item.quantity - 1)}
          onIncrease={() => handleQuantityChange(item.id, item.quantity + 1)}
          onQuantityChange={e => handleQuantityChange(item.id, Number(e.target.value))}
          onRemove={() => handleRemove(item.id)}
        />
      ))}
    </section>
  );
};

export default CartList; 