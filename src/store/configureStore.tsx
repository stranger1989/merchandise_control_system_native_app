import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as reduxFormReducer } from 'redux-form';
import itemReducer from '../reducers/item';

import rootSaga from '../sagas/item';

/* eslint-disable no-underscore-dangle, @typescript-eslint/no-explicit-any */
const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
/* eslint-enable */

const sagaMiddleWare = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleWare));

const store = createStore(
  combineReducers({
    item: itemReducer,
    form: reduxFormReducer,
  }),
  enhancer,
);

sagaMiddleWare.run(rootSaga);

export type AllState = ReturnType<typeof store.getState>;
export default store;
