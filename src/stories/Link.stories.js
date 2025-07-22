import Link from '../components/atoms/Link';

export default {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    ariaLabel: { control: 'text' },
    className: { control: 'text' },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
    },
  },
};

export const Default = {
  args: {
    href: '#',
    children: 'Default Link',
  },
};

export const External = {
  args: {
    href: 'https://example.com',
    children: 'External Link',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

export const ProductLink = {
  args: {
    href: '#product-details',
    children: 'View Product Details',
    ariaLabel: 'View details for Premium Wireless Headphones',
  },
};

export const NavigationLink = {
  args: {
    href: '/cart',
    children: 'Go to Cart',
  },
};

export const LongText = {
  args: {
    href: '#',
    children: 'This is a longer link text that might wrap to multiple lines',
  },
};
