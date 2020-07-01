import React, { FC } from 'react';
// import { connect } from 'react-redux';
import { Container } from 'native-base';

import HeaderComponent from '../components/organisms/Header';

import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

const AccountScreen: FC<{
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}> = ({ navigation }) => {
  return (
    <Container>
      <HeaderComponent navigation={navigation} />
    </Container>
  );
};

export default AccountScreen;

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AccountScreen);
