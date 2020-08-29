import { all, call, fork, put, takeLatest, select } from 'redux-saga/effects';
import { AllState } from '../store/configureStore';
import * as Action from '../actions/itemActionTypes';
import * as actions from '../actions/item';
import {
  ItemModel,
  fetchItemsApi,
  postItemApi,
  deleteItemApi,
  updateItemApi,
} from '../api/item';

const getItems = (state: AllState) => state.item.items;

function* fetchAllItems() {
  try {
    const api = () => fetchItemsApi();
    const items = yield call(api);

    yield put(actions.fetchAllItems.succeed({ items }));
  } catch (error) {
    alert(error);
    yield put(actions.fetchAllItems.fail(error));
  }
}
export function* watchFetchItems() {
  yield takeLatest(Action.FETCH_ITEMS_START, fetchAllItems);
}

function* postItem(action: ReturnType<typeof actions.postItem.start>) {
  try {
    const api = () => postItemApi(action.payload);
    const responseItem = yield call(api);
    const currentItems = yield select(getItems);
    const items = [...currentItems, responseItem];

    yield put(actions.postItem.succeed({ items }));
  } catch (error) {
    alert(error);
    yield put(actions.postItem.fail(error));
  }
}
export function* watchPostItem() {
  yield takeLatest(Action.POST_ITEM_START, postItem);
}

function* deleteItem(action: ReturnType<typeof actions.deleteItem.start>) {
  try {
    const api = () => deleteItemApi(action.payload);
    const responseId = yield call(api);
    const currentItems = yield select(getItems);
    const items = [...currentItems].filter(
      (item: ItemModel) => item.id !== Number(responseId.id),
    );
    yield put(actions.deleteItem.succeed({ items }));
  } catch (error) {
    alert(error);
    yield put(actions.deleteItem.fail(error));
  }
}
export function* watchDeleteItem() {
  yield takeLatest(Action.DELETE_ITEM_START, deleteItem);
}

function* updateItem(action: ReturnType<typeof actions.updateItem.start>) {
  try {
    const api = () => updateItemApi(action.payload);
    const responseItem = yield call(api);
    const currentItems = yield select(getItems);
    const items = [...currentItems].map((item: ItemModel) => {
      if (item.id === Number(responseItem.id)) {
        return responseItem;
      } else {
        return item;
      }
    });

    yield put(actions.updateItem.succeed({ items }));
  } catch (error) {
    alert(error);
    yield put(actions.updateItem.fail(error));
  }
}
export function* watchUpdateItem() {
  yield takeLatest(Action.UPDATE_ITEM_START, updateItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchItems),
    fork(watchPostItem),
    fork(watchDeleteItem),
    fork(watchUpdateItem),
  ]);
}
