import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Container, Content, Spinner } from 'native-base';
import { NavigationParams } from 'react-navigation';

import store from '../store/configureStore';
import { fetchItems } from '../actions/item';
import { Item } from '../services/item/models';

import HeaderComponent from '../components/03_organisms/Header';
import CardComponent from '../components/03_organisms/Card';

type AllState = ReturnType<typeof store.getState>;

const mapStateToProps = (state: AllState) => ({
  items: state.item.items,
  isLoading: state.item.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchItemsStart: () => fetchItems.start(),
    },
    dispatch,
  );

const HomeScreen: FC<{
  items: Item[];
  isLoading: boolean;
  fetchItemsStart: () => void;
  navigation: NavigationParams;
}> = ({ items, isLoading, fetchItemsStart, navigation }) => {
  useEffect(() => {
    (async () => {
      await fetchItemsStart();
    })();
  }, []);

  return (
    <>
      <Container>
        <HeaderComponent navigation={navigation} />
        {isLoading ? (
          <Spinner color="blue" />
        ) : (
          <Content padder>
            {items.map((item: Item, index: number) => (
              <CardComponent key={index} item={item} />
            ))}
          </Content>
        )}
      </Container>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
