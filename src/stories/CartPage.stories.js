import { fn } from 'storybook/test';
import CartPage from '../CartPage';

export default {
  title: 'Pages/CartPage',
  component: CartPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onQuantityChange: { action: 'quantity-changed' },
    onRemove: { action: 'item-removed' },
    onCheckout: { action: 'checkout-clicked' },
  },
  args: {
    onQuantityChange: fn(),
    onRemove: fn(),
    onCheckout: fn(),
  },
};

const mockCart = [
  {
    id: 1,
    product: {
      name: 'Premium Wireless Headphones',
      link: '#',
      imageSrc: 'https://via.placeholder.com/120x120/4caf50/ffffff?text=Headphones',
      imageAlt: 'Premium Wireless Headphones',
      price: '89.99',
    },
    quantity: 2,
  },
  {
    id: 2,
    product: {
      name: 'Smart Watch',
      link: '#',
      imageSrc: 'https://via.placeholder.com/120x120/2196f3/ffffff?text=Watch',
      imageAlt: 'Smart Watch',
      price: '249.99',
    },
    quantity: 1,
  },
  {
    id: 3,
    product: {
      name: 'Bluetooth Speaker',
      link: '#',
      imageSrc: 'https://via.placeholder.com/120x120/ff9800/ffffff?text=Speaker',
      imageAlt: 'Bluetooth Speaker',
      price: '59.99',
    },
    quantity: 3,
  },
];

export const Default = {
  args: {
    cart: mockCart,
  },
};

export const EmptyCart = {
  args: {
    cart: [],
  },
};

export const SingleItem = {
  args: {
    cart: [mockCart[0]],
  },
};

export const ManyItems = {
  args: {
    cart: [
      ...mockCart,
      {
        id: 4,
        product: {
          name: 'Gaming Mouse',
          link: '#',
          imageSrc: 'https://via.placeholder.com/120x120/9c27b0/ffffff?text=Mouse',
          imageAlt: 'Gaming Mouse',
          price: '79.99',
        },
        quantity: 1,
      },
      {
        id: 5,
        product: {
          name: 'Mechanical Keyboard',
          link: '#',
          imageSrc: 'https://via.placeholder.com/120x120/f44336/ffffff?text=Keyboard',
          imageAlt: 'Mechanical Keyboard',
          price: '129.99',
        },
        quantity: 1,
      },
    ],
  },
};
