import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import CenterView from './CenterView';
import Welcome from './Welcome';

import HeaderComponent from '../../src/components/organisms/Header';
import FooterComponent from '../../src/components/organisms/Footer';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Test', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Header', () => <HeaderComponent navigation={null} />)
  .add('Footer', () => <FooterComponent navigation={null} />);
