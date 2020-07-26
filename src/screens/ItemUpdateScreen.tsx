import React, { FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Container } from 'native-base';
import { change } from 'redux-form';

import { ScreenNavigationProp } from '../navigators/TabNavigation';

import { updateItem } from '../actions/item';
import { AllState } from '../store/configureStore';
import { ItemId, ItemModel } from '../services/item/models';

import ItemFormComponent from '../components/organisms/ItemForm';

const mapStateToProps = (state: AllState) => ({
  items: state.item.items,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      updateItemStart: (itemId: ItemId, params: ItemModel) =>
        updateItem.start(itemId, params),
      change: (field: string, data: Date) => change('itemForm', field, data),
    },
    dispatch,
  );

interface ItemUpdateScreenProps extends ScreenNavigationProp {
  updateItemStart: (itemId: { id: number }, params: ItemModel) => void;
  change: (field: string, data: Date) => void;
}

const ItemUpdateScreen: FC<ItemUpdateScreenProps> = ({
  updateItemStart,
  change,
  navigation,
  route,
}) => {
  const submit = (values: ItemModel) => {
    const convertValues = {
      ...values,
      price: Number(values.price) ?? 0,
      stock: Number(values.stock) ?? 0,
      discontinued: Boolean(values.discontinued) ?? false,
    };
    alert(`here is the update value ${JSON.stringify(convertValues)}`);
    updateItemStart({ id: route.params?.item.id ?? -1 }, convertValues);
    navigation.navigate('Warehouse');
  };

  return (
    <Container>
      <ItemFormComponent
        submitFunction={submit}
        change={change}
        initialValues={{
          jan_code: route.params?.item.jan_code ?? '',
          item_name: route.params?.item.item_name ?? '',
          price: route.params?.item.price ?? 0,
          category_id: route.params?.item.category_id ?? 0,
          series_id: route.params?.item.series_id ?? 0,
          stock: route.params?.item.stock ?? 0,
          discontinued: route.params?.item.discontinued ?? false,
          release_date: new Date(route.params?.item.release_date ?? ''),
        }}
      />
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemUpdateScreen);
