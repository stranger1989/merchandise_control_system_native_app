import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { IndexPath } from '@ui-kitten/components';

import { ScreenNavigationProp } from '../navigators/TabNavigation';

import { postItem } from '../actions/item';
import { ItemFormModel } from '../api/item';

import ItemFormComponent from '../components/organisms/ItemForm';

const ItemPostScreen: FC<ScreenNavigationProp> = ({ navigation }) => {
  const dispatch = useDispatch();

  const postSubmit = async (values: ItemFormModel) => {
    const convertValues = {
      ...values,
      price: Number(values.price) ?? 0,
      stock: Number(values.stock) ?? 0,
      category_id: values.category_id.row,
      series_id: values.series_id.row,
      discontinued: Boolean(values.discontinued) ?? false,
    };
    alert(`here is the value ${JSON.stringify(convertValues)}`);
    await dispatch(postItem.start(convertValues));
    navigation.navigate('Warehouse');
  };

  return (
    <ItemFormComponent
      submitFunction={postSubmit}
      initialValues={{
        category_id: new IndexPath(0),
        series_id: new IndexPath(0),
        discontinued: false,
        release_date: new Date(),
      }}
    />
  );
};

export default ItemPostScreen;
