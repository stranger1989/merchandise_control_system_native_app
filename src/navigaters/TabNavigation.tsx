import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import AccountScreen from '../screens/AccountScreen';

import FooterComponent from '../components/organisms/Footer';

import { NavigationParams } from 'react-navigation';

const tabBarComponent = (props: NavigationParams) => {
  return (
    <FooterComponent
      navigation={props.navigation}
      navigationIndex={props.navigation.state.index}
    />
  );
};

const TabNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: HomeScreen },
      Add: { screen: AddScreen },
      Account: { screen: AccountScreen },
    },
    {
      initialRouteName: 'Home',
      tabBarComponent,
    },
  ),
);

export default TabNavigator;
