import React, { FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { change } from 'redux-form';
import { IndexPath } from '@ui-kitten/components';

import { ScreenNavigationProp } from '../navigators/TabNavigation';

import { postItem } from '../actions/item';
import { ItemModel, ItemFormModel } from '../services/item/models';

import ItemFormComponent from '../components/organisms/ItemForm';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      postItemStart: (params: ItemModel) => postItem.start(params),
      change: (field: string, data: unknown) => change('itemForm', field, data),
    },
    dispatch,
  );

interface ItemPostScreenProps extends ScreenNavigationProp {
  postItemStart: (params: ItemModel) => void;
  change: (field: string, data: unknown) => void;
}

const ItemPostScreen: FC<ItemPostScreenProps> = ({
  postItemStart,
  change,
  navigation,
}) => {
  const submit = (values: ItemFormModel) => {
    const convertValues = {
      ...values,
      price: Number(values.price) ?? 0,
      stock: Number(values.stock) ?? 0,
      category_id: values.category_id.row,
      series_id: values.series_id.row,
      discontinued: Boolean(values.discontinued) ?? false,
    };
    alert(`here is the value ${JSON.stringify(convertValues)}`);
    postItemStart(convertValues);
    navigation.navigate('Warehouse');
  };

  return (
    <ItemFormComponent
      submitFunction={submit}
      change={change}
      initialValues={{
        category_id: new IndexPath(0),
        series_id: new IndexPath(0),
        discontinued: false,
        release_date: new Date(),
      }}
    />
  );
};

export default connect(null, mapDispatchToProps)(ItemPostScreen);
