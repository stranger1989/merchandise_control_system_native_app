import React from 'react';
// import { action } from '@storybook/addon-actions';
import HeaderComponent from '../src/components/03_organisms/Header'
import FooterComponent from '../src/components/03_organisms/Footer'

export default {
  title: 'Navigation',
};

export const Header = () => <HeaderComponent navigation={null} />;

export const Footer = () => <FooterComponent navigation={null} />;
