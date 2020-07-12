import React, { FC } from 'react';
// import { connect } from 'react-redux';
import { Container } from 'native-base';

import HeaderComponent from '../components/organisms/Header';

import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

interface AccountScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const AccountScreen: FC<AccountScreenProps> = ({ navigation }) => {
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
