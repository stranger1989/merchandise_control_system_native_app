import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Container, Content, Spinner } from 'native-base';
import { NavigationParams } from 'react-navigation';

import store from '../store/configureStore';
import { fetchAllItems, deleteItem } from '../actions/item';
import { ItemModel } from '../services/item/models';

import HeaderComponent from '../components/organisms/Header';
import CardComponent from '../components/organisms/Card';

type AllState = ReturnType<typeof store.getState>;

const mapStateToProps = (state: AllState) => ({
  items: state.item.items,
  isLoading: state.item.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchItemsStart: () => fetchAllItems.start(),
      deleteItemStart: (itemId: number) => deleteItem.start(itemId),
    },
    dispatch,
  );

interface HomeScreenProps {
  items: ItemModel[];
  isLoading: boolean;
  fetchItemsStart: () => void;
  deleteItemStart: (itemId: number) => { payload: number };
  navigation: NavigationParams;
}

const HomeScreen: FC<HomeScreenProps> = ({
  items,
  isLoading,
  fetchItemsStart,
  deleteItemStart,
  navigation,
}) => {
  const [itemsState, setItemsState] = useState<ItemModel[]>([]);

  useEffect(() => {
    (async () => {
      await fetchItemsStart();
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('willFocus', () => {
      (async () => {
        await fetchItemsStart();
      })();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setItemsState(items);
  }, [items]);

  const deleteItem = async (itemId: number) => {
    alert(`deleted ${itemId}`);
    const deletedItemId = await deleteItemStart(itemId);
    const newItems = [...itemsState].filter(
      (item: ItemModel) => item.id !== deletedItemId.payload,
    );
    setItemsState(newItems);
  };

  return (
    <>
      <Container>
        <HeaderComponent navigation={navigation} />
        {isLoading ? (
          <Spinner color="blue" />
        ) : (
          <Content padder>
            {itemsState.map((item: ItemModel, index: number) => (
              <CardComponent key={index} item={item} deleteItem={deleteItem} />
            ))}
          </Content>
        )}
      </Container>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
