import React, { FC } from 'react';
// import { connect } from 'react-redux';
import { Container } from 'native-base';

import { ScreenNavigationProp } from '../navigators/index';

import HeaderComponent from '../components/organisms/Header';

interface AccountScreenProps {
  navigation: ScreenNavigationProp;
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
