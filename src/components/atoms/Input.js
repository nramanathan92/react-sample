import styles from './Input.module.css';

const Input = ({ id, label, type = 'text', value, onChange, min, max, step, className, ...rest }) => (
  <div>
    {label && (
      <label htmlFor={id} style={{ display: 'none' }}>{label}</label>
    )}
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      aria-label={label}
      className={`${styles.input}${className ? ` ${className}` : ''}`}
      {...rest}
    />
  </div>
);

export default Input; 