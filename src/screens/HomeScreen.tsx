import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { Layout, Spinner, Button } from '@ui-kitten/components';

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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  cardContainer: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 8,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 10,
    backgroundColor: '#0000',
  },
  spinnerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
        <Layout style={styles.mainContainer}>
          {isLoading ? (
            <View style={styles.spinnerContainer}>
              <Spinner />
            </View>
          ) : (
            <>
              <ScrollView>
                <Layout style={styles.cardContainer}>
                  {items.map((item: ItemModel, index: number) => (
                    <CardComponent
                      key={index}
                      item={item}
                      navigation={navigation}
                      deleteItem={deleteItem}
                      route={route}
                    />
                  ))}
                </Layout>
              </ScrollView>
              <View
                style={{
                  position: 'absolute',
                  bottom: 30,
                  right: 30,
                  alignSelf: 'flex-end',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 8,
                    height: 10,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 10,

                  elevation: 10,
                  backgroundColor: '#0000',
                }}
              >
                <Button
                  onPress={() =>
                    navigation.navigate('ItemPost' as keyof RootStackParamList)
                  }
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    alignSelf: 'flex-end',
                  }}
                >
                  New Item
                </Button>
              </View>
            </>
          )}
        </Layout>
      </SafeAreaView>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
