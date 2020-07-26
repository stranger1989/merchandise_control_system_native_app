import React, { FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Container } from 'native-base';
import { change } from 'redux-form';

import { ScreenNavigationProp } from '../navigators/TabNavigation';

import { postItem } from '../actions/item';
import { AllState } from '../store/configureStore';
import { ItemModel } from '../services/item/models';

import ItemFormComponent from '../components/organisms/ItemForm';

const mapStateToProps = (state: AllState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      postItemStart: (params: ItemModel) => postItem.start(params),
      change: (field: string, data: Date) => change('itemForm', field, data),
    },
    dispatch,
  );

interface ItemPostScreenProps extends ScreenNavigationProp {
  postItemStart: (params: ItemModel) => void;
  change: (field: string, data: Date) => void;
}

const ItemPostScreen: FC<ItemPostScreenProps> = ({
  postItemStart,
  change,
  navigation,
}) => {
  const submit = (values: ItemModel) => {
    const convertValues = {
      ...values,
      price: Number(values.price) ?? 0,
      stock: Number(values.stock) ?? 0,
      discontinued: Boolean(values.discontinued) ?? false,
    };
    alert(`here is the value ${JSON.stringify(convertValues)}`);
    postItemStart(convertValues);
    navigation.navigate('Warehouse');
  };

  return (
    <Container>
      <ItemFormComponent
        submitFunction={submit}
        change={change}
        initialValues={{
          category_id: 0,
          series_id: 0,
          discontinued: false,
          release_date: new Date(),
        }}
      />
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPostScreen);
