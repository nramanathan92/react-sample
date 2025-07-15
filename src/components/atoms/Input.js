import styles from './Input.module.css';
import PropTypes from 'prop-types';

/**
 * Input wrapper component using the composition pattern.
 *
 * Usage:
 * <Input className="...">
 *   <input ... />
 *   <select ... />
 *   ...any children
 * </Input>
 */
const Input = ({ children, className }) => (
  <div className={`${styles.input}${className ? ` ${className}` : ''}`}>
    {children}
  </div>
);

Input.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Input; 