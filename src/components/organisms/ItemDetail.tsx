import React, { SFC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Divider } from '@ui-kitten/components';
import moment from 'moment';

import { ScreenNavigationProp } from '../../navigators/TabNavigation';

import { CATEGORY_NAME, SERIES_NAME } from '../../constants/itemConstants';

const styles = StyleSheet.create({
  itemDetailScreen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  firstSectionLayout: {
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondSectionLayout: {
    padding: 20,
  },
  itemHeadingLayout: {
    width: '70%',
  },
  itemClassificationLayout: {
    width: '30%',
  },
  itemSubInfoLayout: {
    marginBottom: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headingJanCode: {
    fontSize: 14,
    color: 'gray',
  },
});

const ItemDetailComponent: SFC<ScreenNavigationProp> = ({ route }) => {
  return (
    <>
      <View style={styles.firstSectionLayout}>
        <View style={styles.itemHeadingLayout}>
          <Text
            style={styles.headingJanCode}
          >{`${route.params?.item.jan_code}`}</Text>
          <Text category="h5">{route.params?.item.item_name}</Text>
          <Text category="h5">{`¥ ${route.params?.item.price}`}</Text>
        </View>
        <View style={styles.itemClassificationLayout}>
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
      <View style={styles.secondSectionLayout}>
        <View style={styles.itemSubInfoLayout}>
          <Text category="s1" style={{ width: '35%' }}>
            stock
          </Text>
          <Text>{`${route.params?.item.stock}pcs`}</Text>
        </View>
        <View style={styles.itemSubInfoLayout}>
          <Text category="s1" style={{ width: '35%' }}>
            release date
          </Text>
          <Text>{`${moment(route.params?.item.release_date).format(
            'YYYY-MM-DD',
          )}`}</Text>
        </View>
        <View style={styles.itemSubInfoLayout}>
          <Text category="s1" style={{ width: '35%' }}>
            description
          </Text>
          <Text>************************</Text>
        </View>
      </View>
    </>
  );
};

export default ItemDetailComponent;
