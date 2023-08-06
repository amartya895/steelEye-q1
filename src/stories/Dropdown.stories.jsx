import React from 'react';
import { storiesOf } from '@storybook/react';
import Dropdown from '../component/dropdown/Dropdown';

const options = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];

const Template = (args) => <Dropdown {...args} />;

storiesOf('currencySelector', module)
  .add('Default', Template, {
    args: {
      options,
      selectedItem: 'USD',
      onChange: (e) => console.log('Selected Currency:', e.target.value),
      color:'red',
      fontSize:'20px'
    },
  })
  .add('More Currency Options', Template, {
    args: {
      options: ['USD', 'EUR', 'CAD', 'AUD', 'SGD'],
      selectedItem: 'CAD',
      onChange: (e) => console.log('Selected Currency:', e.target.value),
    },
  })
  .add('Pre-selected Currency', Template, {
    args: {
      options,
      selectedItem: 'GBP',
      onChange: (e) => console.log('Selected Currency:', e.target.value),
    },
  });
