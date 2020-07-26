import React, { FC } from 'react';
import {
  NavigationProp,
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import StackNavigation from './StackNavigation';
import { ItemModel } from '../services/item/models';

export type RootStackParamList = {
  Warehouse: undefined;
  ItemPost: { item: ItemModel };
  ItemUpdate: undefined;
  Account: undefined;
};

export interface ScreenNavigationProp {
  navigation: CompositeNavigationProp<
    NavigationProp<RootStackParamList, keyof RootStackParamList>,
    StackNavigationProp<RootStackParamList, keyof RootStackParamList>
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

const TabNavigator: FC<TabNavigatorProps> = ({ screenName }) => {
  return (
    <Tab.Navigator
      initialRouteName={screenName}
      tabBarOptions={{
        activeTintColor: '#002F6C',
      }}
    >
      <Tab.Screen
        name="Warehouse"
        component={HomeStackNavigation}
        options={{
          tabBarLabel: 'Warehouse',
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="warehouse"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sales"
        component={ItemPostStackNavigation}
        options={{
          tabBarLabel: 'Sales',
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-bar"
              color={color}
              size={size}
            />
          ),
          // tabBarBadge: 2,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStackNavigation}
        options={{
          tabBarLabel: 'Profile',
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
