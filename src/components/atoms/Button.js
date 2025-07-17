import React from 'react';
import withCustomRender from '../../withCustomRender';
import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'button', ariaLabel, disabled, className, label }) => (
  <button
    type={type}
    onClick={onClick}
    aria-label={ariaLabel}
    disabled={disabled}
    className={`${styles.button}${className ? ` ${className}` : ''}`}
  >
    {label ?? children}
  </button>
);

export default withCustomRender(Button); 