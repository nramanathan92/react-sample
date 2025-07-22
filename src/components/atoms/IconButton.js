import React from 'react';
import styles from './IconButton.module.css';

const IconButton = ({ icon, ariaLabel, onClick, className, ...rest }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className={`${styles.iconButton}${className ? ` ${className}` : ''}`}
    {...rest}
  >
    {icon}
  </button>
);

export default IconButton; 