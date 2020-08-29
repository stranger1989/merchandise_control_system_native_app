import React, { FC } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { ScreenNavigationProp } from '../navigators/TabNavigation';

import ImageDisplay from '../components/molecules/ImageDisplay';
import ItemDetailComponent from '../components/organisms/ItemDetail';

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

export default ItemDetailScreen;
