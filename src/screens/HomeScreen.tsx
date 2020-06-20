import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  Container,
  Content,
  Spinner,
  Card,
  CardItem,
  Left,
  Body,
  Text,
  Button,
  Icon,
  Right
} from 'native-base';

import { fetchItems } from '../actions/item';
import { ItemState } from '../reducers/item';

import HeaderComponent from '../components/03_organisms/Header';

const mapStateToProps = (state: ItemState) => ({
  itemState: state.items,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
      fetchItemsStart: () => fetchItems.start()
      },
      dispatch,
    )

const HomeScreen: FC<any> = ({ itemState, fetchItemsStart, navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchItemsStart();
    })();
  }, []);

  useEffect(() => {
    if (itemState) {
      setItems(itemState.items)
    }
  });

  return (
    <>
      <Container>
        <HeaderComponent navigation={navigation} />
        {!itemState || itemState.isLoading ?
          <Spinner color='blue' /> :
          <Content padder>
            {items.map((item: any, index: number) =>
              <Card key={index}>
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
                    <Text note>fwrsr</Text>
                  </Content>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon active name="thumbs-up" />
                      <Text>12 Likes</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles" />
                      <Text>4 Comments</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text>aaaaa</Text>
                  </Right>
                </CardItem>
              </Card>
            )}
          </Content>
        }
      </Container>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);