import React from 'react';
import styles from './Image.module.css';

const Image = ({ src, alt, className, ...rest }) => (
  <img src={src} alt={alt} className={`${styles.image}${className ? ` ${className}` : ''}`} {...rest} />
);

export default Image; 