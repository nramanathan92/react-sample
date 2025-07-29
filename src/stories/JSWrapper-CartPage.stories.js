import React from 'react';

export default {
  title: 'JSWrapper/CartPage',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A JavaScript wrapper for the CartPage component that provides a render function for mounting into DOM containers. Uses Zustand store for state management and supports custom decoration callbacks. This is the wrapper used in the test.html demo.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    container: { 
      control: false,
      description: 'DOM element where the CartPage component will be rendered'
    },
    afterDecorate: { 
      control: false,
      description: 'Optional callback function called after component renders for custom DOM manipulation'
    },
  },
};

const mockCart = [
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
];

// Create a wrapper component that simulates how the JS wrapper would be used
const JSWrapperDemo = (args) => {
  const containerRef = React.useRef(null);
  const [isReady, setIsReady] = React.useState(false);
  
  // Helper function to initialize store and render
  const initializeAndRender = React.useCallback(() => {
    if (!containerRef.current) return;
    
    // Initialize store with mock data
    if (window.cartStore?.initializeCart) {
      window.cartStore.initializeCart(mockCart);
    }
    
    // Clear and render
    containerRef.current.innerHTML = '';
    if (window.SFCartPage) {
      window.SFCartPage.render({
        container: containerRef.current,
        ...args
      });
    }
  }, [args]);
  
  // Initialize modules and setup
  React.useEffect(() => {
    const setupModules = async () => {
      if (!window.SFCartPage) {
        try {
          const cartPageModule = await import('../jswrapper/CartPage');
          window.SFCartPage = cartPageModule;
          
          if (!window.cartStore) {
            const storeModule = await import('../store/cartStore');
            window.cartStore = storeModule;
          }
          
          setIsReady(true);
        } catch (error) {
          console.error('Failed to load modules:', error);
        }
      } else {
        setIsReady(true);
      }
    };
    
    setupModules();
  }, []);
  
  // Render when ready or args change
  React.useEffect(() => {
    if (isReady) {
      initializeAndRender();
    }
  }, [isReady, initializeAndRender]);
  
  return (
    <div>
      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>JS Wrapper Demossss:</strong> This shows how the CartPage wrapper would be used in vanilla JavaScript. 
        The component uses Zustand store for state management and supports custom decoration callbacks.
      </div>
      <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '16px', minHeight: '200px' }}>
        {!isReady && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            Loading wrapper modules...
          </div>
        )}
        <div ref={containerRef}></div>
      </div>
    </div>
  );
};

export const Default = {
  render: JSWrapperDemo,
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default CartPage wrapper using Zustand store with mock data. This simulates the basic integration pattern.',
      },
    },
  },
};

export const WithCustomDecoration = {
  render: JSWrapperDemo,
  args: {
    afterDecorate: (props, element) => {
      // Add custom decoration like in test.html
      element.querySelectorAll('.cart-item').forEach(item => {
        const customText = document.createElement('div');
        customText.innerText = 'Custom decoration added!';
        customText.style.color = 'red';
        customText.style.fontWeight = 'bold';
        customText.style.marginTop = '10px';
        customText.style.fontSize = '14px';
        
        const details = item.querySelector('.product-info__details');
        if (details) {
          details.appendChild(customText);
        }
      });
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'CartPage wrapper with custom decoration callback that adds custom elements to cart items after rendering.',
      },
    },
  },
};

export const TestHtmlExample = {
  render: JSWrapperDemo,
  args: {
    afterDecorate: (props, element) => {
      // Replicate the exact custom dropdown logic from test.html
      element.querySelectorAll('.product-qty-update').forEach((qtyContainer, index) => {
        const quantityInput = qtyContainer.querySelector('input[type="number"]');
        const currentQuantity = quantityInput ? parseInt(quantityInput.value) : 1;
        
        const cartItems = window.cartStore ? window.cartStore.getCart() : [];
        const itemId = cartItems[index] ? cartItems[index].id : index + 1;
        
        qtyContainer.innerHTML = '';
        
        const dropdown = document.createElement('select');
        dropdown.className = 'custom-quantity-dropdown';
        
        for (let i = 1; i <= 10; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.textContent = i;
          if (i === currentQuantity) {
            option.selected = true;
          }
          dropdown.appendChild(option);
        }
        
        dropdown.addEventListener('change', (e) => {
          const newQuantity = parseInt(e.target.value);
          if (window.cartStore) {
            window.cartStore.handleQuantityChange(itemId, newQuantity);
          }
        });
        
        const label = document.createElement('label');
        label.textContent = 'Qty: ';
        label.className = 'custom-qty-label';
        
        qtyContainer.appendChild(label);
        qtyContainer.appendChild(dropdown);
        qtyContainer.className = 'custom-qty-container';
      });
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'This story replicates the exact custom dropdown replacement logic from test.html, showing how to replace the default quantity selector with a custom dropdown.',
      },
    },
  },
};