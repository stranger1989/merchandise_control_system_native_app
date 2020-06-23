import React, { FC } from 'react';
import { Provider } from 'react-redux';

import store from './src/store/configureStore';

import AppNavigater from './src/navigaters/index';
import storybook from './storybook/index';

import { EXPO_START_ENV } from 'react-native-dotenv';

const App: FC = () => {
  return (
    <Provider store={store}>
      <AppNavigater />
    </Provider>
  );
};

const startNode = EXPO_START_ENV;

export default startNode === 'storybook' ? storybook : App;
