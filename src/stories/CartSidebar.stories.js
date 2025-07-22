import { fn } from 'storybook/test';
import CartSidebar from '../components/organisms/CartSidebar';

export default {
  title: 'Organisms/CartSidebar',
  component: CartSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    total: { control: 'text' },
    onCheckout: { action: 'checkout-clicked' },
  },
  args: {
    onCheckout: fn(),
  },
};

export const Default = {
  args: {
    total: '429.95',
  },
};

export const LowTotal = {
  args: {
    total: '19.99',
  },
};

export const HighTotal = {
  args: {
    total: '2,599.99',
  },
};

export const ZeroTotal = {
  args: {
    total: '0.00',
  },
};

export const ExactHundred = {
  args: {
    total: '100.00',
  },
};
