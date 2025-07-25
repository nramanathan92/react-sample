import React from 'react';
import Card from '../atoms/Card';
import ProductInfo from './ProductInfo';
import QuantitySelector from './QuantitySelector';
import IconButton from '../atoms/IconButton';
import styles from './CartItem.module.css';

const CartItem = ({ product, quantity, onDecrease, onIncrease, onQuantityChange, onRemove }) => (
  <Card className={`${styles.container} cart-item`}>
    <ProductInfo
      imageSrc={product.imageSrc}
      imageAlt={product.imageAlt}
      name={product.name}
      link={product.link}
      price={product.price}
    />
    <div className={styles.right}>
      <QuantitySelector
        quantity={quantity}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        onChange={onQuantityChange}
      />
    </div>
    <IconButton
      icon={<span aria-hidden="true">×</span>}
      ariaLabel={`Remove ${product.name} from cart`}
      onClick={onRemove}
      className={styles.remove}
    />
  </Card>
);

export default CartItem; 