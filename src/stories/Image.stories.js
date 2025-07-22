import Image from '../components/atoms/Image';

export default {
  title: 'Atoms/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    className: { control: 'text' },
  },
};

export const Default = {
  args: {
    src: 'https://via.placeholder.com/200x200/4caf50/ffffff?text=Image',
    alt: 'Placeholder image',
  },
};

export const Product = {
  args: {
    src: 'https://via.placeholder.com/120x120/2196f3/ffffff?text=Product',
    alt: 'Product image',
  },
};

export const Avatar = {
  args: {
    src: 'https://via.placeholder.com/80x80/ff9800/ffffff?text=👤',
    alt: 'User avatar',
  },
};

export const Thumbnail = {
  args: {
    src: 'https://via.placeholder.com/60x60/9c27b0/ffffff?text=Thumb',
    alt: 'Thumbnail image',
  },
};

export const LargeImage = {
  args: {
    src: 'https://via.placeholder.com/400x300/607d8b/ffffff?text=Large+Image',
    alt: 'Large image example',
  },
};
