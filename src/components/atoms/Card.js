import React from 'react';
import styles from './Card.module.css';

const Card = ({ children, className, ...rest }) => (
  <div className={`${styles.card}${className ? ` ${className}` : ''}`} role="region" {...rest}>
    {children}
  </div>
);

export default Card; 