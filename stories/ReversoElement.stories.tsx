import { Meta, Story } from '@storybook/react';
import React from 'react';
import { ReversoElement } from '../src';
import { ReversoElementProps } from '../src/components/ReversoElement/ReversoElement';

const meta: Meta = {
  title: 'Reverso/ReversoElement',
  component: ReversoElement,
  argTypes: {
    type: {
      defaultValue: 'text',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ReversoElementProps> = args => <ReversoElement {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
};
