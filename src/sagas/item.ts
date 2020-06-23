import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import * as Action from '../actions/itemConstants';
import { fetchItems } from '../actions/item';
import { fetchItemsFactory } from '../services/item/api';

function* runFetchItems() {
  try {
    const api = fetchItemsFactory();
    const items = yield call(api);

    yield put(fetchItems.succeed({ items }));
  } catch (error) {
    yield put(fetchItems.fail(error));
  }
}

export function* watchFetchItems() {
  yield takeLatest(Action.FETCH_ITEMS_START, runFetchItems);
}

export default function* rootSaga() {
  yield all([fork(watchFetchItems)]);
}
