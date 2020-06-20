import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import AccountScreen from '../screens/AccountScreen';

import FooterComponent from '../components/03_organisms/Footer';

const TabNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: HomeScreen },
      Add: { screen: AddScreen },
      Account: { screen: AccountScreen },
    },
    {
      initialRouteName: 'Home',
      tabBarComponent: props => {
        return (
          <FooterComponent
            navigation={props.navigation}
            navigationIndex={props.navigation.state.index}
          />
        );
      }
    }
  )
);

export default TabNavigator;