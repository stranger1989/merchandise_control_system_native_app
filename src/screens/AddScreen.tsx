import React, { FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Container } from 'native-base';
import { change } from 'redux-form';

import { ScreenNavigationProp } from '../navigators/index';

import { postItem } from '../actions/item';
import store from '../store/configureStore';
import { ItemModel } from '../services/item/models';

import HeaderComponent from '../components/organisms/Header';
import PostFormComponent from '../components/organisms/PostForm';

type AllState = ReturnType<typeof store.getState>;

const mapStateToProps = (state: AllState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      postItemStart: (params: ItemModel) => postItem.start(params),
      change: (field: string, data: Date) => change('itemForm', field, data),
    },
    dispatch,
  );

interface AddScreenProps {
  postItemStart: (params: ItemModel) => void;
  change: (field: string, data: Date) => void;
  navigation: ScreenNavigationProp;
}

const AddScreen: FC<AddScreenProps> = ({
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
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <PostFormComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen);
