import { fn } from 'storybook/test';
import Input from '../components/atoms/Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password', 'search', 'tel', 'url'],
    },
    onChange: { action: 'changed' },
    className: { control: 'text' },
  },
  args: {
    onChange: fn(),
  },
};

export const Text = {
  args: {
    type: 'text',
    label: 'Text input',
    placeholder: 'Enter text...',
  },
};

export const NumberInput = {
  args: {
    type: 'number',
    label: 'Number input',
    value: 5,
    min: 1,
    max: 10,
  },
};

export const Email = {
  args: {
    type: 'email',
    label: 'Email input',
    placeholder: 'Enter your email...',
  },
};

export const Password = {
  args: {
    type: 'password',
    label: 'Password input',
    placeholder: 'Enter password...',
  },
};

export const Search = {
  args: {
    type: 'search',
    label: 'Search input',
    placeholder: 'Search products...',
  },
};

export const WithValue = {
  args: {
    type: 'text',
    label: 'Input with value',
    value: 'Pre-filled text',
  },
};
