import Text from '../components/atoms/Text';

export default {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'p', 'h1', 'h2', 'h3', 'strong', 'em', 'div'],
    },
    className: { control: 'text' },
  },
};

export const Span = {
  args: {
    children: 'This is a span text',
    as: 'span',
  },
};

export const Paragraph = {
  args: {
    children: 'This is a paragraph of text that demonstrates the paragraph styling.',
    as: 'p',
  },
};

export const Heading1 = {
  args: {
    children: 'This is an H1 heading',
    as: 'h1',
  },
};

export const Heading2 = {
  args: {
    children: 'This is an H2 heading',
    as: 'h2',
  },
};

export const Heading3 = {
  args: {
    children: 'This is an H3 heading',
    as: 'h3',
  },
};

export const Strong = {
  args: {
    children: 'This is strong/bold text',
    as: 'strong',
  },
};

export const WithCustomClass = {
  args: {
    children: 'Text with custom class',
    as: 'p',
    className: 'custom-text-class',
  },
};
