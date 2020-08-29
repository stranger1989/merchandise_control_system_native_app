import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, View } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { ScreenNavigationProp } from '../navigators/TabNavigation';

import { AllState } from '../store/configureStore';
import { fetchAllItems, deleteItem } from '../actions/item';

import SpinnerComponent from '../components/organisms/Spinner';
import ItemCardListComponent from '../components/organisms/ItemCardList';

const HomeScreen: FC<ScreenNavigationProp> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const itemState = useSelector((state: AllState) => state.item);

  useEffect(() => {
    (async () => {
      await dispatch(fetchAllItems.start());
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      (async () => {
        await dispatch(fetchAllItems.start());
      })();
    });

    return unsubscribe;
  }, [navigation]);

  const deleteButtonHandler = async (itemId: number) => {
    alert(`deleted ${itemId}`);
    await dispatch(deleteItem.start({ id: itemId }));
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {itemState.isLoading ? (
              <SpinnerComponent />
            ) : (
              <>
                <View>
                  <ItemCardListComponent
                    items={itemState.items}
                    deleteItem={deleteButtonHandler}
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

export default HomeScreen;
