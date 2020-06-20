import React, { FC } from 'react';
import {
  Header,
  Left,
  Button,
  Icon,
  Title,
  Right,
  Body,
} from 'native-base';

const HeaderComponent: FC<any> = ({ navigation }) => {
  return (
    <Header>
      <Left>
        <Button
          transparent
          onPress={() => navigation.openDrawer()}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Home</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name='search' />
        </Button>
        <Button transparent>
          <Icon name='more' />
        </Button>
      </Right>
    </Header>
  )
};

export default HeaderComponent;