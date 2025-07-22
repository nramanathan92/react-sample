import Card from '../components/atoms/Card';

export default {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export const Default = {
  args: {
    children: (
      <div style={{ padding: '20px' }}>
        <h3>Card Title</h3>
        <p>This is some content inside the card.</p>
      </div>
    ),
  },
};

export const WithCustomClass = {
  args: {
    children: (
      <div style={{ padding: '20px' }}>
        <h3>Custom Card</h3>
        <p>This card has a custom class.</p>
      </div>
    ),
    className: 'custom-card-class',
  },
};

export const ProductCard = {
  args: {
    children: (
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <img 
          src="https://via.placeholder.com/120x120/4caf50/ffffff?text=Product" 
          alt="Product" 
          style={{ marginBottom: '12px', borderRadius: '4px' }}
        />
        <h4 style={{ margin: '0 0 8px 0' }}>Product Name</h4>
        <p style={{ margin: '0 0 12px 0', color: '#666' }}>$19.99</p>
        <button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Add to Cart
        </button>
      </div>
    ),
  },
};
