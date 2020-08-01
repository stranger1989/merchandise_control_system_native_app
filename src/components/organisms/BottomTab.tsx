import React, { SFC } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconProps,
} from '@ui-kitten/components';

const SettingIcon = (props: IconProps) => (
  <Icon {...props} name="settings-2-outline" />
);

const GraphIcon = (props: IconProps) => (
  <Icon {...props} name="bar-chart-outline" />
);

const ArchiveIcon = (props: IconProps) => (
  <Icon {...props} name="archive-outline" />
);

const BottomTabBar: SFC<BottomTabBarProps> = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={ArchiveIcon} title="WAREHOUSE" />
    <BottomNavigationTab icon={GraphIcon} title="SALES" />
    <BottomNavigationTab icon={SettingIcon} title="SETTING" />
  </BottomNavigation>
);

export default BottomTabBar;
