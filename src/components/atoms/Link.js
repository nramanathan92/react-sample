import React from 'react';
import styles from './Link.module.css';

const Link = ({ href, children, ariaLabel, className, ...rest }) => (
  <a href={href} aria-label={ariaLabel} className={`${styles.link}${className ? ` ${className}` : ''}`} {...rest}>
    {children}
  </a>
);

export default Link; 