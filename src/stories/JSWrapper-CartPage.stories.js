import React from 'react';
import { fn } from 'storybook/test';
import CartPage from '../CartPage';

export default {
  title: 'JSWrapper/CartPage',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A JavaScript wrapper for the CartPage component that provides a render function for mounting into DOM containers. Used for UMD builds and vanilla JS integration. This is the wrapper used in the test.html demo.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    cart: { 
      control: 'object',
      description: 'Array of cart items with product information and quantities'
    },
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
          React.createElement(CartPage, args)
        );
      });
    }
  }, [args]);
  
  return (
    <div>
      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>JS Wrapper Demo:</strong> This shows how the CartPage wrapper would be used in vanilla JavaScript (like in test.html)
      </div>
      <div ref={containerRef}></div>
    </div>
  );
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
  render: JSWrapperDemo,
  args: {
    cart: mockCart,
  },
};

export const EmptyCart = {
  render: JSWrapperDemo,
  args: {
    cart: [],
  },
};

export const SingleItem = {
  render: JSWrapperDemo,
  args: {
    cart: [mockCart[0]],
  },
};

export const TestHtmlExample = {
  render: JSWrapperDemo,
  args: {
    cart: [
      {
        id: 1,
        product: {
          name: 'Product 1',
          link: '#',
          imageSrc: 'https://via.placeholder.com/120x120/4caf50/ffffff?text=Product+1',
          imageAlt: 'Product 1',
          price: '10.99',
        },
        quantity: 4,
      },
      {
        id: 2,
        product: {
          name: 'Product 1',
          link: '#',
          imageSrc: 'https://via.placeholder.com/120x120/4caf50/ffffff?text=Product+1',
          imageAlt: 'Product 1',
          price: '10.99',
        },
        quantity: 1,
      },
      {
        id: 3,
        product: {
          name: 'Product 2',
          link: '#',
          imageSrc: 'https://via.placeholder.com/120x120/2196f3/ffffff?text=Product+2',
          imageAlt: 'Product 2',
          price: '20.99',
        },
        quantity: 1,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story uses the exact same data as in your test.html file, showing how the wrapper integrates with vanilla JavaScript.',
      },
    },
  },
};

export const ManyItems = {
  render: JSWrapperDemo,
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
        quantity: 2,
      },
    ],
  },
};
