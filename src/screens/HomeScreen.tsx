import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Container, Content, Spinner, Button, Text } from 'native-base';

import {
  ScreenNavigationProp,
  RootStackParamList,
} from '../navigators/TabNavigation';

import { AllState } from '../store/configureStore';
import { fetchAllItems, deleteItem } from '../actions/item';
import { ItemId, ItemModel } from '../services/item/models';

import CardComponent from '../components/organisms/Card';

const mapStateToProps = (state: AllState) => ({
  items: state.item.items,
  isLoading: state.item.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchItemsStart: () => fetchAllItems.start(),
      deleteItemStart: (itemId: ItemId) => deleteItem.start(itemId),
    },
    dispatch,
  );

interface HomeScreenProps extends ScreenNavigationProp {
  items: ItemModel[];
  isLoading: boolean;
  fetchItemsStart: () => void;
  deleteItemStart: (itemId: ItemId) => { payload: { id: number } };
}

const HomeScreen: FC<HomeScreenProps> = ({
  items,
  isLoading,
  fetchItemsStart,
  deleteItemStart,
  navigation,
  route,
}) => {
  useEffect(() => {
    (async () => {
      await fetchItemsStart();
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      (async () => {
        await fetchItemsStart();
      })();
    });

    return unsubscribe;
  }, [navigation]);

  const deleteItem = async (itemId: number) => {
    alert(`deleted ${itemId}`);
    await deleteItemStart({ id: itemId });
  };

  return (
    <>
      <Container>
        {isLoading ? (
          <Spinner color="blue" />
        ) : (
          <Content padder>
            {items.map((item: ItemModel, index: number) => (
              <CardComponent
                key={index}
                item={item}
                navigation={navigation}
                deleteItem={deleteItem}
                route={route}
              />
            ))}
            <Button
              onPress={() =>
                navigation.navigate('ItemPost' as keyof RootStackParamList)
              }
            >
              <Text>New Item</Text>
            </Button>
          </Content>
        )}
      </Container>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
