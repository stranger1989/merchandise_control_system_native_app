import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';

import store from './store/configureStore';

import AppNavigater from './navigaters/index';
import storybook from '../storybook/index';

import { EXPO_START_ENV } from 'react-native-dotenv';

const App: FC = () => {
  return (
    <Provider store={store}>
      <AppNavigater />
    </Provider>
  );
};

const startNode = EXPO_START_ENV;

export default startNode === 'storybook'
  ? registerRootComponent(storybook)
  : registerRootComponent(App);
