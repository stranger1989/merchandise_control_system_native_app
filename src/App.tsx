import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';

import store from './store/configureStore';

import TabNavigation from './navigators/TabNavigation';
import storybook from '../storybook/index';

import { EXPO_START_ENV } from 'react-native-dotenv';

const App: FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <SafeAreaProvider>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: theme['color-primary-500'] }}
            >
              <TabNavigation screenName="Home" />
            </SafeAreaView>
          </SafeAreaProvider>
        </ApplicationProvider>
      </NavigationContainer>
    </Provider>
  );
};

const startNode = EXPO_START_ENV;

export default startNode === 'storybook'
  ? registerRootComponent(storybook)
  : registerRootComponent(App);
