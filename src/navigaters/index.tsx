import React from "react";
import SidebarScreen from '../screens/SidebarScreen';
import TabNavigation from './TabNavigation';

import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

const HomeScreenRouter = createAppContainer(
  createDrawerNavigator(
    {
      Home: { screen: TabNavigation },
    },
    {
      contentComponent: props => <SidebarScreen navigation={props.navigation} />
    }
  )
);

export default HomeScreenRouter;