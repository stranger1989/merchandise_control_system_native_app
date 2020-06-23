import React from 'react';
import SidebarScreen from '../screens/SidebarScreen';
import TabNavigation from './TabNavigation';

import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { NavigationParams } from 'react-navigation';

const contentComponent = (props: NavigationParams) => {
  return <SidebarScreen navigation={props.navigation} />;
};

const HomeScreenRouter = createAppContainer(
  createDrawerNavigator(
    {
      Home: { screen: TabNavigation },
    },
    {
      contentComponent,
    },
  ),
);

export default HomeScreenRouter;
