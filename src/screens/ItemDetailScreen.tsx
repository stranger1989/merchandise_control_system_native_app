import React, { FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { ScreenNavigationProp } from '../navigators/TabNavigation';

import { updateItem } from '../actions/item';
import { AllState } from '../store/configureStore';
import { ItemId, ItemModel } from '../services/item/models';

import ImageDisplay from '../components/molecules/ImageDisplay';
import ItemDetailComponent from '../components/organisms/ItemDetail';

const mapStateToProps = (state: AllState) => ({
  items: state.item.items,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      updateItemStart: (itemId: ItemId, params: ItemModel) =>
        updateItem.start(itemId, params),
    },
    dispatch,
  );

const styles = StyleSheet.create({
  itemDetailScreen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

const ItemDetailScreen: FC<ScreenNavigationProp> = ({ route, navigation }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={styles.itemDetailScreen}>
          <ScrollView>
            <ImageDisplay
              imageName={route.params?.item.jan_code ?? ''}
              imageText={route.params?.item.item_name ?? ''}
            />
            <ItemDetailComponent route={route} navigation={navigation} />
          </ScrollView>
        </Layout>
      </SafeAreaView>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailScreen);
