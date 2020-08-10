import React, { SFC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '@ui-kitten/components';

const styles = StyleSheet.create({
  spinnerScreen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SpinnerComponent: SFC = () => {
  return (
    <View style={styles.spinnerScreen}>
      <Spinner />
    </View>
  );
};

export default SpinnerComponent;
