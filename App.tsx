import React, { FC } from 'react';
import { Provider } from 'react-redux';

import store from './src/store/configureStore';

import AppNavigater from './src/navigaters/index';

const App: FC = () => {
  return (
    <Provider store={store}>
      <AppNavigater />
    </Provider>
  );
}

export default App;