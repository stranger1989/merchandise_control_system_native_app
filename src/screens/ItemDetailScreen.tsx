import React, { FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Text, Layout, Button, Divider } from '@ui-kitten/components';

import { ScreenNavigationProp } from '../navigators/TabNavigation';

import { updateItem } from '../actions/item';
import { AllState } from '../store/configureStore';
import { ItemId, ItemModel } from '../services/item/models';

import { CATEGORY_NAME, SERIES_NAME } from '../constants/itemConstants';

import { images } from '../../assets/index';

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

const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  itemMainInfoArea: {
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstColumn: {
    width: '70%',
  },
  itemSubInfoArea: {
    padding: 20,
  },
  itemSubInfoRow: {
    marginBottom: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: dimensions.width,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  janCode: {
    fontSize: 14,
    color: 'gray',
  },
});

interface ItemDetailScreenProps extends ScreenNavigationProp {
  updateItemStart: (itemId: { id: number }, params: ItemModel) => void;
}

const ItemDetailScreen: FC<ItemDetailScreenProps> = ({ route }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={styles.mainContainer}>
          <ScrollView>
            <View style={styles.overlay}>
              <ImageBackground
                source={images[`dummy_${route.params?.item.jan_code}`] ?? null}
                resizeMode="cover"
                style={styles.image}
              >
                <View style={styles.overlay}>
                  <Text style={styles.text}>
                    {route.params?.item.item_name}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.itemMainInfoArea}>
              <View style={styles.firstColumn}>
                <Text
                  style={styles.janCode}
                >{`${route.params?.item.jan_code}`}</Text>
                <Text category="h5">{route.params?.item.item_name}</Text>
                <Text category="h5">{`¥ ${route.params?.item.price}`}</Text>
              </View>
              <View>
                <Button status="primary" size="small">
                  {CATEGORY_NAME[Number(route.params?.item.category_id)]}
                </Button>
                <Button
                  style={{ marginTop: 10 }}
                  appearance="outline"
                  status="primary"
                  size="small"
                >
                  {SERIES_NAME[Number(route.params?.item.series_id)]}
                </Button>
              </View>
            </View>
            <Divider />
            <View style={styles.itemSubInfoArea}>
              <View style={styles.itemSubInfoRow}>
                <Text category="s2" style={{ width: '35%' }}>
                  stock{' '}
                </Text>
                <Text>{`${route.params?.item.stock}pcs`}</Text>
              </View>
              <View style={styles.itemSubInfoRow}>
                <Text category="s2" style={{ width: '35%' }}>
                  release date{' '}
                </Text>
                <Text>{`${String(route.params?.item.release_date)}`}</Text>
              </View>
              <View style={styles.itemSubInfoRow}>
                <Text category="s2" style={{ width: '35%' }}>
                  description
                </Text>
                <Text>************************</Text>
              </View>
            </View>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailScreen);
