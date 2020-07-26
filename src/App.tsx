import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';

import store from './store/configureStore';

import TabNavigation from './navigators/TabNavigation';
import storybook from '../storybook/index';

import { EXPO_START_ENV } from 'react-native-dotenv';

const App: FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigation screenName="Home" />
      </NavigationContainer>
    </Provider>
  );
};

const startNode = EXPO_START_ENV;

export default startNode === 'storybook'
  ? registerRootComponent(storybook)
  : registerRootComponent(App);
