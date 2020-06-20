import React from 'react';
// import { connect } from 'react-redux';
import {
  Container,
} from 'native-base';

import HeaderComponent from '../components/03_organisms/Header';

const AccountScreen: React.FC<any> = ({ navigation }) => {
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