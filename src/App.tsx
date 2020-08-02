import React, { FC, useState, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView, View } from 'react-native';
import LottieView from 'lottie-react-native';

import store from './store/configureStore';

import TabNavigation from './navigators/TabNavigation';
import storybook from '../storybook/index';

import { EXPO_START_ENV } from 'react-native-dotenv';

const timeout = (ms: number): Promise<void> => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};

const App: FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    const animationDisplay = async () => {
      await timeout(3000);
      setAppIsReady(true);
    };

    animationDisplay();
  }, []);

  useEffect(() => {
    animation.current.play();
  }, []);

  if (!appIsReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme['color-primary-500'],
        }}
      >
        <LottieView
          ref={animation}
          style={{
            width: 300,
            height: 300,
            marginBottom: 100,
          }}
          source={require('../assets/testLottie.json')}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
      </View>
    );
  }

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
