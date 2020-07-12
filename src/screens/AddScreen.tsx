import React, { FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Container } from 'native-base';
import { NavigationParams } from 'react-navigation';

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
    },
    dispatch,
  );

interface AddScreenProps {
  postItemStart: (params: ItemModel) => void;
  navigation: NavigationParams;
}

const AddScreen: FC<AddScreenProps> = ({ postItemStart, navigation }) => {
  const submit = (values: ItemModel) => {
    alert(`here is the value ${JSON.stringify(values)}`);
    postItemStart(values);
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <PostFormComponent submitFunction={submit} />
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen);
