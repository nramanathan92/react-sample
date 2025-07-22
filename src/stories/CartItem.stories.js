import { fn } from 'storybook/test';
import CartItem from '../components/molecules/CartItem';

export default {
  title: 'Molecules/CartItem',
  component: CartItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    quantity: { control: { type: 'number', min: 1, max: 99 } },
    onDecrease: { action: 'decreased' },
    onIncrease: { action: 'increased' },
    onQuantityChange: { action: 'quantity-changed' },
    onRemove: { action: 'removed' },
  },
  args: {
    onDecrease: fn(),
    onIncrease: fn(),
    onQuantityChange: fn(),
    onRemove: fn(),
  },
};

const mockProduct = {
  name: 'Premium Wireless Headphones',
  link: '#',
  imageSrc: 'https://via.placeholder.com/120x120/4caf50/ffffff?text=Product',
  imageAlt: 'Premium Wireless Headphones',
  price: '89.99',
};

export const Default = {
  args: {
    product: mockProduct,
    quantity: 1,
  },
};

export const WithHigherQuantity = {
  args: {
    product: mockProduct,
    quantity: 5,
  },
};

export const DifferentProduct = {
  args: {
    product: {
      name: 'Smart Watch',
      link: '#',
      imageSrc: 'https://via.placeholder.com/120x120/2196f3/ffffff?text=Watch',
      imageAlt: 'Smart Watch',
      price: '249.99',
    },
    quantity: 2,
  },
};

export const ExpensiveProduct = {
  args: {
    product: {
      name: 'Professional Camera',
      link: '#',
      imageSrc: 'https://via.placeholder.com/120x120/ff9800/ffffff?text=Camera',
      imageAlt: 'Professional Camera',
      price: '1,299.99',
    },
    quantity: 1,
  },
};
