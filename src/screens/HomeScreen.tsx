import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SafeAreaView, View } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { ScreenNavigationProp } from '../navigators/TabNavigation';

import { AllState } from '../store/configureStore';
import { fetchAllItems, deleteItem } from '../actions/item';
import { ItemId, ItemModel } from '../services/item/models';

import SpinnerComponent from '../components/organisms/Spinner';
import ItemCardListComponent from '../components/organisms/ItemCardList';

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
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {isLoading ? (
              <SpinnerComponent />
            ) : (
              <>
                <View>
                  <ItemCardListComponent
                    items={items}
                    deleteItem={deleteItem}
                    navigation={navigation}
                    route={route}
                  />
                </View>
              </>
            )}
          </View>
        </Layout>
      </SafeAreaView>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
