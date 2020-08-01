import React, { SFC } from 'react';
import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import SalesScreen from '../screens/SalesScreen';
import AccountScreen from '../screens/AccountScreen';

import ItemPostScreen from '../screens/ItemPostScreen';
import ItemUpdateScreen from '../screens/ItemUpdateScreen';

import Header from '../components/organisms/Header';

const Stack = createStackNavigator();

interface StackNavigatorProps {
  screenName: string;
}

const StackNavigator: SFC<StackNavigatorProps> = ({ screenName }) => {
  return (
    <Stack.Navigator initialRouteName={screenName} mode="modal">
      <Stack.Screen
        name="Warehouse"
        component={HomeScreen}
        options={{
          header: (props: StackHeaderProps) => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="Sales"
        component={SalesScreen}
        options={{
          header: (props: StackHeaderProps) => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          header: (props: StackHeaderProps) => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="ItemPost"
        component={ItemPostScreen}
        options={{
          header: (props: StackHeaderProps) => (
            <Header {...props} isGoBack={true} />
          ),
        }}
      />
      <Stack.Screen
        name="ItemUpdate"
        component={ItemUpdateScreen}
        options={{
          cardShadowEnabled: true,
          header: (props: StackHeaderProps) => (
            <Header {...props} isGoBack={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
