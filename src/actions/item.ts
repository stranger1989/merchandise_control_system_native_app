import { AxiosError } from 'axios';

import { ItemId, ItemModel } from '../services/item/models';
import * as ActionType from './itemConstants';

interface FetchItemsResult {
  items: ItemModel[];
}

export const fetchAllItems = {
  start: () =>
    ({
      type: ActionType.FETCH_ITEMS_START as typeof ActionType.FETCH_ITEMS_START,
    } as const),

  succeed: (result: FetchItemsResult) =>
    ({
      type: ActionType.FETCH_ITEMS_SUCCEED as typeof ActionType.FETCH_ITEMS_SUCCEED,
      payload: { result },
    } as const),

  fail: (error: AxiosError) =>
    ({
      type: ActionType.FETCH_ITEMS_FAIL as typeof ActionType.FETCH_ITEMS_FAIL,
      payload: { error },
      error: true,
    } as const),
};

export const postItem = {
  start: (params: ItemModel) =>
    ({
      type: ActionType.POST_ITEM_START as typeof ActionType.POST_ITEM_START,
      payload: params,
    } as const),

  succeed: (result: FetchItemsResult) =>
    ({
      type: ActionType.POST_ITEM_SUCCEED as typeof ActionType.POST_ITEM_SUCCEED,
      payload: { result },
    } as const),

  fail: (error: AxiosError) =>
    ({
      type: ActionType.POST_ITEM_FAIL as typeof ActionType.POST_ITEM_FAIL,
      payload: { error },
      error: true,
    } as const),
};

export const deleteItem = {
  start: (itemId: ItemId) =>
    ({
      type: ActionType.DELETE_ITEM_START as typeof ActionType.DELETE_ITEM_START,
      payload: itemId,
    } as const),

  succeed: (result: FetchItemsResult) =>
    ({
      type: ActionType.DELETE_ITEM_SUCCEED as typeof ActionType.DELETE_ITEM_SUCCEED,
      payload: { result },
    } as const),

  fail: (error: AxiosError) =>
    ({
      type: ActionType.DELETE_ITEM_FAIL as typeof ActionType.DELETE_ITEM_FAIL,
      payload: { error },
      error: true,
    } as const),
};

export const updateItem = {
  start: (itemId: ItemId, params: ItemModel) =>
    ({
      type: ActionType.UPDATE_ITEM_START as typeof ActionType.UPDATE_ITEM_START,
      payload: { itemId, params },
    } as const),

  succeed: (result: FetchItemsResult) =>
    ({
      type: ActionType.UPDATE_ITEM_SUCCEED as typeof ActionType.UPDATE_ITEM_SUCCEED,
      payload: { result },
    } as const),

  fail: (error: AxiosError) =>
    ({
      type: ActionType.UPDATE_ITEM_FAIL as typeof ActionType.UPDATE_ITEM_FAIL,
      payload: { error },
      error: true,
    } as const),
};

export type ItemAction =
  | ReturnType<typeof fetchAllItems.start>
  | ReturnType<typeof fetchAllItems.succeed>
  | ReturnType<typeof fetchAllItems.fail>
  | ReturnType<typeof postItem.start>
  | ReturnType<typeof postItem.succeed>
  | ReturnType<typeof postItem.fail>
  | ReturnType<typeof deleteItem.start>
  | ReturnType<typeof deleteItem.succeed>
  | ReturnType<typeof deleteItem.fail>
  | ReturnType<typeof updateItem.start>
  | ReturnType<typeof updateItem.succeed>
  | ReturnType<typeof updateItem.fail>;
