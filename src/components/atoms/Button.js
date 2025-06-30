import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'button', ariaLabel, disabled, className }) => (
  <button
    type={type}
    onClick={onClick}
    aria-label={ariaLabel}
    disabled={disabled}
    className={`${styles.button}${className ? ` ${className}` : ''}`}
  >
    {children}
  </button>
);

export default Button; 