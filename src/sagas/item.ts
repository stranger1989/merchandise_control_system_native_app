import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import * as Action from '../actions/itemConstants';
import * as actions from '../actions/item';
import {
  fetchItemsApi,
  postItemApi,
  deleteItemApi,
} from '../services/item/api';

function* fetchAllItems() {
  try {
    const api = fetchItemsApi();
    const items = yield call(api);

    yield put(actions.fetchAllItems.succeed({ items }));
  } catch (error) {
    yield put(actions.fetchAllItems.fail(error));
  }
}
export function* watchFetchItems() {
  yield takeLatest(Action.FETCH_ITEMS_START, fetchAllItems);
}

function* postItem(action: ReturnType<typeof actions.postItem.start>) {
  try {
    const api = postItemApi(action.payload);
    const item = yield call(api);

    yield put(actions.postItem.succeed({ item }));
  } catch (error) {
    yield put(actions.postItem.fail(error));
  }
}
export function* watchPostItem() {
  yield takeLatest(Action.POST_ITEM_START, postItem);
}

function* deleteItem(action: ReturnType<typeof actions.deleteItem.start>) {
  try {
    const api = deleteItemApi(action.payload);
    const item = yield call(api);

    yield put(actions.deleteItem.succeed({ item }));
  } catch (error) {
    yield put(actions.deleteItem.fail(error));
  }
}
export function* watchDeleteItem() {
  yield takeLatest(Action.DELETE_ITEM_START, deleteItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchItems),
    fork(watchPostItem),
    fork(watchDeleteItem),
  ]);
}
