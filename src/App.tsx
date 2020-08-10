import React, { FC, useState, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { default as customMapping } from './custom-mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import {
  useFonts,
  NunitoSans_200ExtraLight,
  NunitoSans_300Light,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_800ExtraBold,
  NunitoSans_900Black,
} from '@expo-google-fonts/nunito-sans';

import store from './store/configureStore';

import TabNavigation from './navigators/TabNavigation';
import storybook from '../storybook/index';

import { EXPO_START_ENV } from 'react-native-dotenv';

const timeout = (ms: number): Promise<void> => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme['color-primary-500'],
  },
  lottieSplashAnimation: {
    width: 400,
    height: 400,
    marginBottom: 100,
  },
  safeAreaView: { flex: 1, backgroundColor: theme['color-primary-500'] },
});

const App: FC = () => {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const animation = useRef<LottieView | null>(null);

  const [fontsLoaded] = useFonts({
    NunitoSans_200ExtraLight,
    NunitoSans_300Light,
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
    NunitoSans_900Black,
  });

  useEffect(() => {
    const animationDisplay = async () => {
      await timeout(3000);
      setAnimationLoaded(true);
    };

    animationDisplay();
  }, []);

  useEffect(() => {
    animation.current?.play();
  }, []);

  if (!animationLoaded || !fontsLoaded) {
    return (
      <View style={styles.splashScreen}>
        <LottieView
          ref={animation}
          style={styles.lottieSplashAnimation}
          source={require('../assets/splash.json')}
          loop={false}
        />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.light, ...theme }}
          customMapping={{ ...eva.mapping, ...customMapping }}
        >
          <SafeAreaProvider>
            <SafeAreaView style={styles.safeAreaView}>
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
  ? registerRootComponent(storybook as any)
  : registerRootComponent(App);
