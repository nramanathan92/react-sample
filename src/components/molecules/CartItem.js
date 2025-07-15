import Card from '../atoms/Card';
import ProductInfo from './ProductInfo';
import Input from '../atoms/Input';
import IconButton from '../atoms/IconButton';
import styles from './CartItem.module.css';

const CartItem = ({ product, quantity, onDecrease, onIncrease, onQuantityChange, onRemove }) => (
  <Card className={styles.container}>
    <ProductInfo
      imageSrc={product.imageSrc}
      imageAlt={product.imageAlt}
      name={product.name}
      link={product.link}
      price={product.price}
    />
    <div className={styles.right}>
      <Input>
        <select value={quantity} onChange={onQuantityChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </Input>
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