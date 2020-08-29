import { AxiosError } from 'axios';

import { ItemId, ItemModel } from '../api/item';
import * as ActionType from './itemActionTypes';

interface FetchItemsResult {
  items: ItemModel[];
}

export const fetchAllItems = {
  start: () =>
    ({
      type: ActionType.FETCH_ITEMS_START,
    } as const),

  succeed: (result: FetchItemsResult) =>
    ({
      type: ActionType.FETCH_ITEMS_SUCCEED,
      payload: { result },
    } as const),

  fail: (error: AxiosError) =>
    ({
      type: ActionType.FETCH_ITEMS_FAIL,
      payload: { error },
      error: true,
    } as const),
};

export const postItem = {
  start: (params: ItemModel) =>
    ({
      type: ActionType.POST_ITEM_START,
      payload: params,
    } as const),

  succeed: (result: FetchItemsResult) =>
    ({
      type: ActionType.POST_ITEM_SUCCEED,
      payload: { result },
    } as const),

  fail: (error: AxiosError) =>
    ({
      type: ActionType.POST_ITEM_FAIL,
      payload: { error },
      error: true,
    } as const),
};

export const deleteItem = {
  start: (itemId: ItemId) =>
    ({
      type: ActionType.DELETE_ITEM_START,
      payload: itemId,
    } as const),

  succeed: (result: FetchItemsResult) =>
    ({
      type: ActionType.DELETE_ITEM_SUCCEED,
      payload: { result },
    } as const),

  fail: (error: AxiosError) =>
    ({
      type: ActionType.DELETE_ITEM_FAIL,
      payload: { error },
      error: true,
    } as const),
};

export const updateItem = {
  start: (itemId: ItemId, params: ItemModel) =>
    ({
      type: ActionType.UPDATE_ITEM_START,
      payload: { itemId, params },
    } as const),

  succeed: (result: FetchItemsResult) =>
    ({
      type: ActionType.UPDATE_ITEM_SUCCEED,
      payload: { result },
    } as const),

  fail: (error: AxiosError) =>
    ({
      type: ActionType.UPDATE_ITEM_FAIL,
      payload: { error },
      error: true,
    } as const),
};

export type ItemAction = ReturnType<
  | typeof fetchAllItems.start
  | typeof fetchAllItems.succeed
  | typeof fetchAllItems.fail
  | typeof postItem.start
  | typeof postItem.succeed
  | typeof postItem.fail
  | typeof deleteItem.start
  | typeof deleteItem.succeed
  | typeof deleteItem.fail
  | typeof updateItem.start
  | typeof updateItem.succeed
  | typeof updateItem.fail
>;
