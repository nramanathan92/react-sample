import { fn } from 'storybook/test';
import Button from '../components/atoms/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onClick: { action: 'clicked' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    label: 'Button',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

export const WithChildren = {
  args: {
    children: 'Click me!',
  },
};

export const Submit = {
  args: {
    label: 'Submit',
    type: 'submit',
  },
};

export const WithAriaLabel = {
  args: {
    label: 'Save',
    ariaLabel: 'Save your changes',
  },
};
