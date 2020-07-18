import React, { SFC, useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Header, Left, Button, Icon, Title, Right, Body } from 'native-base';
import { ScreenNavigationProp } from '../../navigators/index';

interface HeaderComponentProps {
  navigation: ScreenNavigationProp;
}

const HeaderComponent: SFC<HeaderComponentProps> = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Roboto: require('../../../node_modules/native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      });
      setIsReady(true);
    })();
  }, []);

  return isReady ? (
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.openDrawer()}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Home</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="search" />
        </Button>
        <Button transparent>
          <Icon name="more" />
        </Button>
      </Right>
    </Header>
  ) : null;
};

export default HeaderComponent;
