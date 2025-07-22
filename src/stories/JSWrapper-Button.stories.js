import React from 'react';
import { fn } from 'storybook/test';
import Button from '../components/atoms/Button';

export default {
  title: 'JSWrapper/Button',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A JavaScript wrapper for the Button component that provides a render function for mounting into DOM containers. Used for UMD builds and vanilla JS integration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'clicked' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    onClick: fn(),
  },
};

// Create a wrapper component that simulates how the JS wrapper would be used
const JSWrapperDemo = (args) => {
  const containerRef = React.useRef(null);
  
  React.useEffect(() => {
    if (containerRef.current) {
      // Clear the container first
      containerRef.current.innerHTML = '';
      
      // Simulate what the wrapper would do - mount a React component
      import('react-dom/client').then(({ createRoot }) => {
        createRoot(containerRef.current).render(
          React.createElement(Button, args)
        );
      });
    }
  }, [args]);
  
  return (
    <div>
      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>JS Wrapper Demo:</strong> This shows how the Button wrapper would be used in vanilla JavaScript
      </div>
      <div ref={containerRef}></div>
    </div>
  );
};

export const Default = {
  render: JSWrapperDemo,
  args: {
    label: 'Wrapped Button',
  },
};

export const Disabled = {
  render: JSWrapperDemo,
  args: {
    label: 'Disabled Wrapped Button',
    disabled: true,
  },
};

export const Submit = {
  render: JSWrapperDemo,
  args: {
    label: 'Submit',
    type: 'submit',
  },
};

export const WithAriaLabel = {
  render: JSWrapperDemo,
  args: {
    label: 'Save',
    ariaLabel: 'Save your changes',
  },
};

export const WithCustomClass = {
  render: JSWrapperDemo,
  args: {
    label: 'Custom Button',
    className: 'custom-button-class',
  },
};
