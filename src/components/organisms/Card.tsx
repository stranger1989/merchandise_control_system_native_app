import React, { SFC } from 'react';
import { View, StyleSheet } from 'react-native';
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

const EditIcon = (props: IconProps) => <Icon {...props} name="edit" />;

const TrashIcon = (props: IconProps) => <Icon {...props} name="trash" />;

const styles = StyleSheet.create({
  card: {
    marginBottom: '5%',
  },
  cardLayout: {
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
    <Card style={styles.card}>
      <Layout style={styles.cardLayout}>
        <View>
          <Text category="h6">{item.jan_code}</Text>
          <Text category="s1">{item.item_name}</Text>
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
