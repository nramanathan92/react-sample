import ProductInfo from '../components/molecules/ProductInfo';

export default {
  title: 'Molecules/ProductInfo',
  component: ProductInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
    name: { control: 'text' },
    link: { control: 'text' },
    price: { control: 'text' },
  },
};

export const Default = {
  args: {
    imageSrc: 'https://via.placeholder.com/120x120/4caf50/ffffff?text=Product',
    imageAlt: 'Premium Wireless Headphones',
    name: 'Premium Wireless Headphones',
    link: '#product-details',
    price: '89.99',
  },
};

export const ExpensiveProduct = {
  args: {
    imageSrc: 'https://via.placeholder.com/120x120/2196f3/ffffff?text=Laptop',
    imageAlt: 'Gaming Laptop',
    name: 'High-Performance Gaming Laptop',
    link: '#laptop-details',
    price: '1,599.99',
  },
};

export const CheapProduct = {
  args: {
    imageSrc: 'https://via.placeholder.com/120x120/ff9800/ffffff?text=Cable',
    imageAlt: 'USB Cable',
    name: 'USB-C Cable',
    link: '#cable-details',
    price: '9.99',
  },
};

export const LongProductName = {
  args: {
    imageSrc: 'https://via.placeholder.com/120x120/9c27b0/ffffff?text=Device',
    imageAlt: 'Professional Camera',
    name: 'Professional DSLR Camera with 24-70mm Lens and Accessories Kit',
    link: '#camera-details',
    price: '2,499.99',
  },
};

export const NoImage = {
  args: {
    imageSrc: 'invalid-image-url.jpg',
    imageAlt: 'Product without image',
    name: 'Product with Missing Image',
    link: '#no-image-product',
    price: '49.99',
  },
};
