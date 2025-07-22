import { fn } from 'storybook/test';
import CartSummary from '../components/molecules/CartSummary';

export default {
  title: 'Molecules/CartSummary',
  component: CartSummary,
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
    total: '89.99',
  },
};

export const LowTotal = {
  args: {
    total: '12.50',
  },
};

export const HighTotal = {
  args: {
    total: '1,234.56',
  },
};

export const ZeroTotal = {
  args: {
    total: '0.00',
  },
};

export const SingleCent = {
  args: {
    total: '0.01',
  },
};

export const ExactDollar = {
  args: {
    total: '100.00',
  },
};
