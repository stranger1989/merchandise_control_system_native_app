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

import { ItemModel } from '../../services/item/models';

import {
  ScreenNavigationProp,
  RootStackParamList,
} from '../../navigators/TabNavigation';

import { images } from '../../../assets/index';

const EditIcon = (props: IconProps) => <Icon {...props} name="edit" />;

const TrashIcon = (props: IconProps) => <Icon {...props} name="trash" />;

const styles = StyleSheet.create({
  card: {
    margin: '4%',
    borderWidth: 0,
  },
  cardLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfoLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardActionsLayout: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardButton: {
    width: 20,
    marginRight: 15,
    marginLeft: 15,
  },
  image: {
    width: 100,
    height: 100,
    margin: -30,
    marginRight: 20,
  },
});

interface CardComponentProps extends ScreenNavigationProp {
  item: ItemModel;
  deleteItem: (itemId: number) => void;
}

const CardComponent: SFC<CardComponentProps> = ({
  item,
  navigation,
  deleteItem,
}) => {
  return (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.push('ItemDetail' as keyof RootStackParamList, {
          item,
        });
      }}
    >
      <Layout style={styles.cardLayout}>
        <View style={styles.itemInfoLayout}>
          <ImageBackground
            source={images[`dummy_${item.jan_code}`] ?? null}
            resizeMode="cover"
            style={styles.image}
          />
          <View>
            <Text category="s2" style={{ color: 'grey' }}>
              {item.jan_code}
            </Text>
            <Text category="s2">{item.item_name}</Text>
          </View>
        </View>
        <View style={styles.cardActionsLayout}>
          <Button
            onPress={() => {
              navigation.push('ItemUpdate' as keyof RootStackParamList, {
                item,
              });
            }}
            appearance="ghost"
            accessoryLeft={EditIcon}
            style={styles.cardButton}
          />
          <Button
            onPress={() => deleteItem(item.id)}
            appearance="ghost"
            accessoryLeft={TrashIcon}
            style={styles.cardButton}
          />
        </View>
      </Layout>
    </Card>
  );
};

export default CardComponent;
