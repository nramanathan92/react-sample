import styles from './Text.module.css';

const Text = ({ as: Component = 'span', children, className = '', ...rest }) => {
  let baseClass = '';
  if (Component === 'h1' || Component === 'h2' || Component === 'h3') baseClass = styles.heading;
  else if (Component === 'p') baseClass = styles.paragraph;
  else if (Component === 'strong') baseClass = styles.strong;

  return (
    <Component className={`${baseClass}${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </Component>
  );
};

export default Text; 