import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import SalesScreen from '../screens/SalesScreen';
import AccountScreen from '../screens/AccountScreen';

import ItemPostScreen from '../screens/ItemPostScreen';
import ItemUpdateScreen from '../screens/ItemUpdateScreen';

const Stack = createStackNavigator();

const HomeScreenRouter: FC<{ screenName: string }> = ({ screenName }) => {
  return (
    <Stack.Navigator
      initialRouteName={screenName}
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#002F6C',
          opacity: '0.9',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Warehouse" component={HomeScreen} />
      <Stack.Screen name="Sales" component={SalesScreen} />
      <Stack.Screen name="ItemPost" component={ItemPostScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen
        name="ItemUpdate"
        component={ItemUpdateScreen}
        options={{
          cardShadowEnabled: true,
          // eslint-disable-next-line react/display-name
          // headerLeft: () => (
          //   <TouchableHighlight onPress={() => navigation.goBack()}>
          //     <MaterialCommunityIcons name="close" color="#fff" size={30} />
          //   </TouchableHighlight>
          // ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenRouter;
