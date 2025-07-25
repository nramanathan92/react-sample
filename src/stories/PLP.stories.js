import { fn } from 'storybook/test';
import PLP from '../PLP';

export default {
  title: 'Pages/PLP',
  component: PLP,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Product Listing Page (PLP) component following Adobe Commerce (Magento) schema. Supports filtering, sorting, pagination, and follows e-commerce best practices.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onAddToCart: { action: 'add-to-cart' },
    onFilterChange: { action: 'filter-changed' },
    onSortChange: { action: 'sort-changed' },
    onPageChange: { action: 'page-changed' },
    categoryName: { control: 'text' },
    currentPage: { control: { type: 'number', min: 1 } },
    pageSize: { control: { type: 'number', min: 1, max: 50 } },
    loading: { control: 'boolean' },
    currentSort: { 
      control: 'select',
      options: ['position', 'name', 'price', 'created_at', 'rating_summary']
    },
  },
  args: {
    onAddToCart: fn(),
    onFilterChange: fn(),
    onSortChange: fn(),
    onPageChange: fn(),
  },
};

// Mock product data following Magento schema
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
  },
  {
    id: 7,
    sku: 'TB-GRAPHICS-001',
    name: 'Graphics Tablet Pro',
    url_key: 'graphics-tablet-pro',
    price: 199.99,
    image: {
      url: 'https://via.placeholder.com/280x280/795548/ffffff?text=Tablet',
      label: 'Graphics Tablet Pro'
    },
    small_image: {
      url: 'https://via.placeholder.com/280x280/795548/ffffff?text=Tablet',
      label: 'Graphics Tablet Pro'
    },
    price_range: {
      minimum_price: {
        regular_price: { value: 199.99 },
        final_price: { value: 199.99 }
      }
    },
    rating_summary: 91,
    review_count: 28,
    stock_status: 'LOW_STOCK'
  },
  {
    id: 8,
    sku: 'CM-WEBCAM-001',
    name: '4K Webcam',
    url_key: '4k-webcam',
    price: 89.99,
    image: {
      url: 'https://via.placeholder.com/280x280/3f51b5/ffffff?text=Webcam',
      label: '4K Webcam'
    },
    small_image: {
      url: 'https://via.placeholder.com/280x280/3f51b5/ffffff?text=Webcam',
      label: '4K Webcam'
    },
    price_range: {
      minimum_price: {
        regular_price: { value: 89.99 },
        final_price: { value: 89.99 }
      }
    },
    rating_summary: 76,
    review_count: 89,
    stock_status: 'OUT_OF_STOCK'
  }
];

// Mock filters following Magento schema
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

export const WithFiltersApplied = {
  args: {
    products: mockProducts.slice(0, 4),
    filters: mockFilters,
    currentPage: 1,
    pageSize: 12,
    totalCount: 4,
    categoryName: 'Gaming Accessories',
    selectedFilters: {
      category_id: ['3'],
      price: ['50-100', '100-200']
    },
    currentSort: 'price',
  },
};

export const EmptyResults = {
  args: {
    products: [],
    filters: mockFilters,
    currentPage: 1,
    pageSize: 12,
    totalCount: 0,
    categoryName: 'Search Results',
    selectedFilters: {
      brand: ['nonexistent']
    },
    currentSort: 'position',
  },
};

export const Loading = {
  args: {
    products: [],
    filters: [],
    currentPage: 1,
    pageSize: 12,
    totalCount: 0,
    categoryName: 'Electronics',
    loading: true,
  },
};

export const WithPagination = {
  args: {
    products: mockProducts.slice(0, 6),
    filters: mockFilters,
    currentPage: 2,
    pageSize: 6,
    totalCount: 48,
    categoryName: 'All Products',
    selectedFilters: {},
    currentSort: 'name',
  },
};

export const SaleProducts = {
  args: {
    products: mockProducts.filter(p => p.special_price),
    filters: mockFilters,
    currentPage: 1,
    pageSize: 12,
    totalCount: 3,
    categoryName: 'Sale Items',
    selectedFilters: {},
    currentSort: 'price',
  },
};

export const MobileView = {
  args: {
    products: mockProducts.slice(0, 4),
    filters: mockFilters,
    currentPage: 1,
    pageSize: 12,
    totalCount: 4,
    categoryName: 'Electronics',
    selectedFilters: {},
    currentSort: 'position',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
