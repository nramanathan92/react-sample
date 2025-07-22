import { fn } from 'storybook/test';
import QuantitySelector from '../components/molecules/QuantitySelector';

export default {
  title: 'Molecules/QuantitySelector',
  component: QuantitySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    quantity: { control: { type: 'number', min: 1, max: 99 } },
    min: { control: { type: 'number', min: 0 } },
    max: { control: { type: 'number', min: 1 } },
    onDecrease: { action: 'decreased' },
    onIncrease: { action: 'increased' },
    onChange: { action: 'changed' },
  },
  args: {
    onDecrease: fn(),
    onIncrease: fn(),
    onChange: fn(),
  },
};

export const Default = {
  args: {
    quantity: 1,
  },
};

export const WithQuantity5 = {
  args: {
    quantity: 5,
  },
};

export const AtMinimum = {
  args: {
    quantity: 1,
    min: 1,
  },
};

export const AtMaximum = {
  args: {
    quantity: 99,
    max: 99,
  },
};

export const CustomRange = {
  args: {
    quantity: 5,
    min: 2,
    max: 10,
  },
};
