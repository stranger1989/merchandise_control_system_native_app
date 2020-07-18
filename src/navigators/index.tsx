import React from 'react';
import TabNavigation from './TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerScreenProps,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const Drawer = createDrawerNavigator();

export type RootStackParamList = {
  Home: undefined;
  Add: undefined;
  Account: undefined;
};

export type ScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList>,
  DrawerNavigationProp<RootStackParamList>
>;

const HomeTabNavigation = (props: DrawerScreenProps<RootStackParamList>) => (
  <TabNavigation screenName={'Home'} {...props} />
);

const AddTabNavigation = (props: DrawerScreenProps<RootStackParamList>) => (
  <TabNavigation screenName={'Add'} {...props} />
);

const AccountTabNavigation = (props: DrawerScreenProps<RootStackParamList>) => (
  <TabNavigation screenName={'Account'} {...props} />
);

const HomeScreenRouter = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeTabNavigation} />
        <Drawer.Screen name="Add" component={AddTabNavigation} />
        <Drawer.Screen name="Account" component={AccountTabNavigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreenRouter;
