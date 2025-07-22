import { fn } from 'storybook/test';
import IconButton from '../components/atoms/IconButton';

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    className: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
  args: {
    onClick: fn(),
  },
};

export const Close = {
  args: {
    icon: <span aria-hidden="true">×</span>,
    ariaLabel: 'Close',
  },
};

export const Delete = {
  args: {
    icon: <span aria-hidden="true">🗑️</span>,
    ariaLabel: 'Delete',
  },
};

export const Edit = {
  args: {
    icon: <span aria-hidden="true">✏️</span>,
    ariaLabel: 'Edit',
  },
};

export const Heart = {
  args: {
    icon: <span aria-hidden="true">❤️</span>,
    ariaLabel: 'Add to favorites',
  },
};

export const Plus = {
  args: {
    icon: <span aria-hidden="true">+</span>,
    ariaLabel: 'Add item',
  },
};

export const Minus = {
  args: {
    icon: <span aria-hidden="true">−</span>,
    ariaLabel: 'Remove item',
  },
};
