import React, { SFC } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

interface HeaderComponentProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  navigationIndex: number;
}

const FooterComponent: SFC<HeaderComponentProps> = ({
  navigation,
  navigationIndex = 0,
}) => {
  return (
    <Footer>
      <FooterTab>
        <Button
          vertical
          active={navigationIndex === 0}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="home" />
          <Text>Home</Text>
        </Button>
        <Button
          vertical
          active={navigationIndex === 1}
          onPress={() => navigation.navigate('Add')}
        >
          <Icon name="add" />
          <Text>Add</Text>
        </Button>
        <Button
          vertical
          active={navigationIndex === 2}
          onPress={() => navigation.navigate('Account')}
        >
          <Icon name="contact" />
          <Text>Account</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default FooterComponent;
