import React, { SFC } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import {
  Button,
  Card,
  Layout,
  Text,
  Icon,
  IconProps,
} from '@ui-kitten/components';

import { ItemModel } from '../../api/item';

import {
  ScreenNavigationProp,
  RootStackParamList,
} from '../../navigators/TabNavigation';

import { images } from '../../../assets/index';

const EditIcon = (props: IconProps) => <Icon {...props} name="edit" />;

const TrashIcon = (props: IconProps) => <Icon {...props} name="trash" />;

const styles = StyleSheet.create({
  itemCard: {
    margin: '4%',
    borderWidth: 0,
    elevation: 5,
  },
  itemCardLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfoLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardActionsButtonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardActionsButton: {
    width: 20,
    marginRight: 15,
    marginLeft: 15,
  },
  itemCardImage: {
    width: 110,
    height: 110,
    margin: -30,
    marginRight: 20,
  },
  itemName: {
    width: 120,
  },
});

interface ItemCardComponentProps extends ScreenNavigationProp {
  item: ItemModel;
  deleteItem: (itemId: number) => void;
}

const ItemCardComponent: SFC<ItemCardComponentProps> = ({
  item,
  navigation,
  deleteItem,
}) => {
  return (
    <Card
      style={styles.itemCard}
      onPress={() => {
        navigation.push('ItemDetail' as keyof RootStackParamList, {
          item,
        });
      }}
    >
      <Layout style={styles.itemCardLayout}>
        <View style={styles.itemInfoLayout}>
          <ImageBackground
            source={images[`dummy_${item.jan_code}`] ?? null}
            resizeMode="cover"
            style={styles.itemCardImage}
          />
          <View style={styles.itemName}>
            <Text category="s1" style={{ color: 'grey' }}>
              {item.jan_code}
            </Text>
            <Text category="s1">{item.item_name}</Text>
          </View>
        </View>
        <View style={styles.cardActionsButtonLayout}>
          <Button
            onPress={() => {
              navigation.push('ItemUpdate' as keyof RootStackParamList, {
                item,
              });
            }}
            appearance="ghost"
            accessoryLeft={EditIcon}
            style={styles.cardActionsButton}
          />
          <Button
            onPress={() => deleteItem(item.id)}
            appearance="ghost"
            accessoryLeft={TrashIcon}
            style={styles.cardActionsButton}
          />
        </View>
      </Layout>
    </Card>
  );
};

export default ItemCardComponent;
