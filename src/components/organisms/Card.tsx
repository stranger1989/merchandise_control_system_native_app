import React, { SFC } from 'react';
import {
  Card,
  CardItem,
  Content,
  Left,
  Body,
  Text,
  Button,
  Icon,
  Right,
} from 'native-base';
import { ItemModel } from '../../services/item/models';

import {
  ScreenNavigationProp,
  RootStackParamList,
} from '../../navigators/TabNavigation';

interface CardComponentProps extends ScreenNavigationProp {
  item: ItemModel;
  deleteItem: (itemId: number) => void;
}

const CardComponent: SFC<CardComponentProps> = ({
  item,
  navigation,
  deleteItem,
}) => {
  return (
    <Card>
      <CardItem>
        <Left>
          <Body>
            <Text>{item.jan_code}</Text>
            <Text note>{item.item_name}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Content horizontal={true}>
          <Text note>test text</Text>
        </Content>
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="thumbs-up" />
            <Text>0 Likes</Text>
          </Button>
        </Left>
        <Body>
          <Button
            transparent
            onPress={() => {
              navigation.push('ItemUpdate' as keyof RootStackParamList, {
                item,
              });
            }}
          >
            <Icon
              active
              name="edit"
              style={{ fontSize: 25, color: 'gray' }}
              type="MaterialIcons"
            />
          </Button>
        </Body>
        <Right>
          <Button transparent onPress={() => deleteItem(item.id)}>
            <Icon active name="trash" style={{ fontSize: 30, color: 'gray' }} />
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};

export default CardComponent;
