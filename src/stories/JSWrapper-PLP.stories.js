import React from 'react';
import { fn } from 'storybook/test';
import PLP from '../PLP';

export default {
  title: 'JSWrapper/PLP',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A JavaScript wrapper for the Product Listing Page (PLP) component that provides a render function for mounting into DOM containers. Used for UMD builds and vanilla JS integration in e-commerce sites.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    products: { control: 'object' },
    filters: { control: 'object' },
    onAddToCart: { action: 'add-to-cart' },
    onFilterChange: { action: 'filter-changed' },
    onSortChange: { action: 'sort-changed' },
    onPageChange: { action: 'page-changed' },
    categoryName: { control: 'text' },
    currentPage: { control: { type: 'number', min: 1 } },
    pageSize: { control: { type: 'number', min: 1, max: 50 } },
  },
  args: {
    onAddToCart: fn(),
    onFilterChange: fn(),
    onSortChange: fn(),
    onPageChange: fn(),
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
          React.createElement(PLP, args)
        );
      });
    }
  }, [args]);
  
  return (
    <div>
      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>JS Wrapper Demo:</strong> This shows how the PLP wrapper would be used in vanilla JavaScript for e-commerce integration
      </div>
      <div ref={containerRef}></div>
    </div>
  );
};

// Mock data for the stories
const mockProducts = [
  {
    id: 1,
    sku: 'WH-HEADPHONES-001',
    name: 'Premium Wireless Headphones',
    url_key: 'premium-wireless-headphones',
    price: 89.99,
    special_price: 69.99,
    image: {
      url: 'https://via.placeholder.com/280x280/4caf50/ffffff?text=Headphones',
      label: 'Premium Wireless Headphones'
    },
    small_image: {
      url: 'https://via.placeholder.com/280x280/4caf50/ffffff?text=Headphones',
      label: 'Premium Wireless Headphones'
    },
    price_range: {
      minimum_price: {
        regular_price: { value: 89.99 },
        final_price: { value: 69.99 }
      }
    },
    rating_summary: 85,
    review_count: 42,
    stock_status: 'IN_STOCK'
  },
  {
    id: 2,
    sku: 'SW-WATCH-001',
    name: 'Smart Watch Series X',
    url_key: 'smart-watch-series-x',
    price: 249.99,
    image: {
      url: 'https://via.placeholder.com/280x280/2196f3/ffffff?text=Watch',
      label: 'Smart Watch Series X'
    },
    small_image: {
      url: 'https://via.placeholder.com/280x280/2196f3/ffffff?text=Watch',
      label: 'Smart Watch Series X'
    },
    price_range: {
      minimum_price: {
        regular_price: { value: 249.99 },
        final_price: { value: 249.99 }
      }
    },
    rating_summary: 90,
    review_count: 128,
    stock_status: 'IN_STOCK'
  },
  {
    id: 3,
    sku: 'BT-SPEAKER-001',
    name: 'Bluetooth Speaker Pro',
    url_key: 'bluetooth-speaker-pro',
    price: 59.99,
    image: {
      url: 'https://via.placeholder.com/280x280/ff9800/ffffff?text=Speaker',
      label: 'Bluetooth Speaker Pro'
    },
    small_image: {
      url: 'https://via.placeholder.com/280x280/ff9800/ffffff?text=Speaker',
      label: 'Bluetooth Speaker Pro'
    },
    price_range: {
      minimum_price: {
        regular_price: { value: 59.99 },
        final_price: { value: 59.99 }
      }
    },
    rating_summary: 78,
    review_count: 67,
    stock_status: 'IN_STOCK'
  },
  {
    id: 4,
    sku: 'GM-MOUSE-001',
    name: 'Gaming Mouse RGB',
    url_key: 'gaming-mouse-rgb',
    price: 79.99,
    special_price: 59.99,
    image: {
      url: 'https://via.placeholder.com/280x280/9c27b0/ffffff?text=Mouse',
      label: 'Gaming Mouse RGB'
    },
    small_image: {
      url: 'https://via.placeholder.com/280x280/9c27b0/ffffff?text=Mouse',
      label: 'Gaming Mouse RGB'
    },
    price_range: {
      minimum_price: {
        regular_price: { value: 79.99 },
        final_price: { value: 59.99 }
      }
    },
    rating_summary: 82,
    review_count: 94,
    stock_status: 'IN_STOCK'
  },
  {
    id: 5,
    sku: 'KB-MECH-001',
    name: 'Mechanical Keyboard',
    url_key: 'mechanical-keyboard',
    price: 129.99,
    image: {
      url: 'https://via.placeholder.com/280x280/f44336/ffffff?text=Keyboard',
      label: 'Mechanical Keyboard'
    },
    small_image: {
      url: 'https://via.placeholder.com/280x280/f44336/ffffff?text=Keyboard',
      label: 'Mechanical Keyboard'
    },
    price_range: {
      minimum_price: {
        regular_price: { value: 129.99 },
        final_price: { value: 129.99 }
      }
    },
    rating_summary: 95,
    review_count: 156,
    stock_status: 'IN_STOCK'
  },
  {
    id: 6,
    sku: 'LP-GAMING-001',
    name: 'Gaming Laptop Ultra',
    url_key: 'gaming-laptop-ultra',
    price: 1599.99,
    image: {
      url: 'https://via.placeholder.com/280x280/607d8b/ffffff?text=Laptop',
      label: 'Gaming Laptop Ultra'
    },
    small_image: {
      url: 'https://via.placeholder.com/280x280/607d8b/ffffff?text=Laptop',
      label: 'Gaming Laptop Ultra'
    },
    price_range: {
      minimum_price: {
        regular_price: { value: 1599.99 },
        final_price: { value: 1599.99 }
      }
    },
    rating_summary: 88,
    review_count: 73,
    stock_status: 'IN_STOCK'
  }
];

const mockFilters = [
  {
    attribute_code: 'category_id',
    label: 'Category',
    options: [
      { value: '1', label: 'Electronics', count: 15 },
      { value: '2', label: 'Audio', count: 8 },
      { value: '3', label: 'Gaming', count: 12 },
      { value: '4', label: 'Computers', count: 6 }
    ]
  },
  {
    attribute_code: 'price',
    label: 'Price',
    options: [
      { value: '0-50', label: 'Under $50', count: 3 },
      { value: '50-100', label: '$50 - $100', count: 12 },
      { value: '100-200', label: '$100 - $200', count: 8 },
      { value: '200-500', label: '$200 - $500', count: 4 },
      { value: '500+', label: '$500+', count: 2 }
    ]
  },
  {
    attribute_code: 'brand',
    label: 'Brand',
    options: [
      { value: 'techcorp', label: 'TechCorp', count: 12 },
      { value: 'gamertech', label: 'GamerTech', count: 8 },
      { value: 'audiomax', label: 'AudioMax', count: 6 },
      { value: 'prodevices', label: 'ProDevices', count: 4 }
    ]
  }
];

export const Default = {
  render: JSWrapperDemo,
  args: {
    products: mockProducts,
    filters: mockFilters,
    currentPage: 1,
    pageSize: 12,
    totalCount: mockProducts.length,
    categoryName: 'Electronics',
    selectedFilters: {},
    currentSort: 'position',
  },
};

export const EcommerceIntegration = {
  render: JSWrapperDemo,
  args: {
    products: mockProducts.slice(0, 4),
    filters: mockFilters,
    currentPage: 1,
    pageSize: 4,
    totalCount: 24,
    categoryName: 'Gaming Gear',
    selectedFilters: {
      category_id: ['3']
    },
    currentSort: 'name',
  },
  parameters: {
    docs: {
      description: {
        story: 'This story shows how the PLP wrapper would integrate with an existing e-commerce platform, passing product data from Magento/Adobe Commerce GraphQL APIs.',
      },
    },
  },
};

export const WithAfterDecorate = {
  render: JSWrapperDemo,
  args: {
    products: mockProducts.slice(0, 3),
    filters: mockFilters,
    currentPage: 1,
    pageSize: 12,
    totalCount: 3,
    categoryName: 'Featured Products',
    selectedFilters: {},
    currentSort: 'position',
    afterDecorate: (props, element) => {
      // Add custom badges to sale products
      element.querySelectorAll('.product-card').forEach(card => {
        const saleFlag = card.querySelector('[class*="saleFlag"]');
        if (saleFlag) {
          const customBadge = document.createElement('div');
          customBadge.innerText = '🔥 HOT DEAL';
          customBadge.style.cssText = `
            position: absolute;
            top: 40px;
            left: 12px;
            background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: bold;
            z-index: 2;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          `;
          card.style.position = 'relative';
          card.appendChild(customBadge);
        }
      });
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the afterDecorate functionality, where custom DOM manipulations are applied after the component renders. Useful for adding tracking pixels, custom badges, or third-party integrations.',
      },
    },
  },
};
