import Button from '../atoms/Button';
import Input from '../atoms/Input';
import styles from './QuantitySelector.module.css';

const QuantitySelector = ({ quantity, onDecrease, onIncrease, onChange, min = 1, max = 99 }) => (
  <div className={styles.container} role="group" aria-label="Quantity selector">
    <Button ariaLabel="Decrease quantity" onClick={onDecrease} disabled={quantity <= min}>−</Button>
    <Input
      type="select"
      options={[{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }]}
      value={quantity}
      onChange={onChange}
      min={min}
      max={max}
      aria-label="Quantity"
    />
    <Button ariaLabel="Increase quantity" onClick={onIncrease} disabled={quantity >= max}>+</Button>
  </div>
);

export default QuantitySelector; 