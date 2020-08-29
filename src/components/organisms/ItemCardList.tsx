import React, { SFC } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from '@ui-kitten/components';

import { ItemModel } from '../../api/item';

import ItemCardComponent from '../molecules/ItemCard';

import {
  ScreenNavigationProp,
  RootStackParamList,
} from '../../navigators/TabNavigation';

const styles = StyleSheet.create({
  itemCardLayout: {
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

    elevation: 5,
    backgroundColor: '#0000',
  },
  newItemButtonLayout: {
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
    backgroundColor: '#0000',
  },
});

interface ItemCardListComponentProps extends ScreenNavigationProp {
  items: ItemModel[];
  deleteItem: (itemId: number) => void;
}

const ItemCardListComponent: SFC<ItemCardListComponentProps> = ({
  items,
  route,
  navigation,
  deleteItem,
}) => {
  return (
    <>
      <ScrollView>
        <View style={styles.itemCardLayout}>
          {items.map((item: ItemModel, index: number) => (
            <ItemCardComponent
              key={index}
              item={item}
              navigation={navigation}
              deleteItem={deleteItem}
              route={route}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.newItemButtonLayout}>
        <Button
          onPress={() =>
            navigation.navigate('ItemPost' as keyof RootStackParamList)
          }
          style={{ elevation: 5 }}
        >
          New Item
        </Button>
      </View>
    </>
  );
};

export default ItemCardListComponent;
