import React, { SFC } from 'react';
import {
  NavigationProp,
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import StackNavigation from './StackNavigation';

import { ItemModel } from '../services/item/models';
import BottomTab from '../components/organisms/BottomTab';

export type RootStackParamList = {
  Warehouse: undefined;
  ItemPost: { item: ItemModel };
  ItemUpdate: undefined;
  Account: undefined;
};

export interface ScreenNavigationProp {
  navigation: CompositeNavigationProp<
    CompositeNavigationProp<
      NavigationProp<RootStackParamList, keyof RootStackParamList>,
      StackNavigationProp<RootStackParamList, keyof RootStackParamList>
    >,
    BottomTabNavigationProp<RootStackParamList, keyof RootStackParamList>
  >;
  route: RouteProp<RootStackParamList, keyof RootStackParamList>;
}

const HomeStackNavigation = (props: ScreenNavigationProp) => (
  <StackNavigation screenName={'Warehouse'} {...props} />
);

const ItemPostStackNavigation = (props: ScreenNavigationProp) => (
  <StackNavigation screenName={'Sales'} {...props} />
);

const AccountStackNavigation = (props: ScreenNavigationProp) => (
  <StackNavigation screenName={'Account'} {...props} />
);

const Tab = createBottomTabNavigator();

interface TabNavigatorProps {
  screenName: string;
}

const TabNavigator: SFC<TabNavigatorProps> = ({ screenName }) => {
  return (
    <Tab.Navigator
      initialRouteName={screenName}
      tabBar={(props) => <BottomTab {...props} />}
    >
      <Tab.Screen name="Warehouse" component={HomeStackNavigation} />
      <Tab.Screen name="Sales" component={ItemPostStackNavigation} />
      <Tab.Screen name="Account" component={AccountStackNavigation} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
