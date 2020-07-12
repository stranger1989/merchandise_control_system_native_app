import React, { FC } from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';
const routes = ['Home', 'Add', 'Account'];

import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

interface SideBarProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SideBar: FC<SideBarProps> = ({ navigation }) => {
  return (
    <Container>
      <Content>
        <List
          dataArray={routes}
          renderRow={(data) => {
            return (
              <ListItem button onPress={() => navigation.navigate(data)}>
                <Text>{data}</Text>
              </ListItem>
            );
          }}
        />
      </Content>
    </Container>
  );
};

export default SideBar;
