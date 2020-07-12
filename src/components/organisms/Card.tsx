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

interface CardComponentProps {
  item: ItemModel;
  deleteItem: (itemId: number) => void;
}

const CardComponent: SFC<CardComponentProps> = ({ item, deleteItem }) => {
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
          <Button transparent>
            <Icon active name="chatbubbles" />
            <Text>0 Comments</Text>
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
