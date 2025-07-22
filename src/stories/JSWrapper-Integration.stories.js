import React from 'react';

export default {
  title: 'JSWrapper/Integration Demo',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'This demonstrates how the JavaScript wrappers would be integrated into a real HTML page, similar to your test.html file.',
      },
    },
  },
  tags: ['autodocs'],
};

const IntegrationDemo = () => {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CartPage Integration Demo</title>
  <!-- Load the UMD bundle -->
  <script src="../dist/sf-cart-page.js"></script>
  <script>
    function init() {
      // Mock data for demonstration
      const initialCart = [
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
            name: 'Product 2',
            link: '#',
            imageSrc: 'https://via.placeholder.com/120x120/2196f3/ffffff?text=Product+2',
            imageAlt: 'Product 2',
            price: '20.99',
          },
          quantity: 1,
        },
      ];

      // Render the cart using the wrapper
      SFCartPage?.render({
        container: document.getElementById('cart1'),
        cart: initialCart,
        onQuantityChange: (itemId, quantity) => {
          console.log('Quantity changed:', itemId, quantity);
        },
        onRemove: (itemId) => {
          console.log('Item removed:', itemId);
        },
        onCheckout: () => {
          console.log('Checkout clicked');
        },
      });
    }
  </script>
</head>
<body onload="init()">
  <h1>E-commerce Site Integration</h1>
  <p>This shows how React components can be embedded in any website:</p>
  
  <!-- The cart will be rendered here -->
  <div id="cart1"></div>
</body>
</html>`;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>HTML Integration Example</h2>
        <p>This is how your CartPage component would be integrated into a vanilla HTML page:</p>
      </div>
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        border: '1px solid #dee2e6', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          backgroundColor: '#e9ecef', 
          padding: '10px 15px', 
          borderBottom: '1px solid #dee2e6',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          test.html
        </div>
        <pre style={{ 
          margin: 0, 
          padding: '15px', 
          fontSize: '12px',
          lineHeight: '1.4',
          overflow: 'auto',
          maxHeight: '400px'
        }}>
          <code>{htmlContent}</code>
        </pre>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Key Integration Points:</h3>
        <ul>
          <li><strong>UMD Script Loading:</strong> The component is loaded as a global variable</li>
          <li><strong>Container Element:</strong> A DOM element where React will mount</li>
          <li><strong>Initialization:</strong> Call the render function with props</li>
          <li><strong>Event Handlers:</strong> Vanilla JS functions for component interactions</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '4px' }}>
        <strong>✅ Benefits:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li>No framework lock-in for the host application</li>
          <li>Progressive enhancement - add React components to existing sites</li>
          <li>Easy to integrate with CMSs, e-commerce platforms, or legacy systems</li>
          <li>Full React functionality with simple JavaScript API</li>
        </ul>
      </div>
    </div>
  );
};

export const HTMLIntegration = {
  render: () => <IntegrationDemo />,
};
