import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { IndexPath } from '@ui-kitten/components';

import { ScreenNavigationProp } from '../navigators/TabNavigation';

import { updateItem } from '../actions/item';
import { ItemFormModel } from '../api/item';

import ItemFormComponent from '../components/organisms/ItemForm';

const ItemUpdateScreen: FC<ScreenNavigationProp> = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const updateSubmit = async (values: ItemFormModel) => {
    const convertValues = {
      ...values,
      price: Number(values.price) ?? 0,
      stock: Number(values.stock) ?? 0,
      category_id: values.category_id.row,
      series_id: values.series_id.row,
      discontinued: Boolean(values.discontinued) ?? false,
    };
    alert(`here is the update value ${JSON.stringify(convertValues)}`);
    await dispatch(
      updateItem.start({ id: route.params?.item.id ?? -1 }, convertValues),
    );
    navigation.navigate('Warehouse');
  };

  return (
    <ItemFormComponent
      submitFunction={updateSubmit}
      initialValues={{
        jan_code: route.params?.item.jan_code ?? '',
        item_name: route.params?.item.item_name ?? '',
        price: String(route.params?.item.price) ?? '0',
        category_id: new IndexPath(route.params?.item.category_id ?? 0),
        series_id: new IndexPath(route.params?.item.series_id ?? 0),
        stock: String(route.params?.item.stock) ?? 0,
        discontinued: route.params?.item.discontinued ?? false,
        release_date: new Date(route.params?.item.release_date ?? ''),
      }}
    />
  );
};

export default ItemUpdateScreen;
