import { AxiosError } from 'axios';

import { Item } from '../services/item/models';
import * as ActionType from './itemConstants';

interface FetchItemsResult {
  items: Item[];
}

export const fetchItems = {
  start: () => ({
    type: ActionType.FETCH_ITEMS_START as typeof ActionType.FETCH_ITEMS_START,
  }),

  succeed: (result: FetchItemsResult) => ({
    type: ActionType.FETCH_ITEMS_SUCCEED as typeof ActionType.FETCH_ITEMS_SUCCEED,
    payload: { result },
  }),

  fail: (error: AxiosError) => ({
    type: ActionType.FETCH_ITEMS_FAIL as typeof ActionType.FETCH_ITEMS_FAIL,
    payload: { error },
    error: true,
  }),
};

export type ItemAction =
  | ReturnType<typeof fetchItems.start>
  | ReturnType<typeof fetchItems.succeed>
  | ReturnType<typeof fetchItems.fail>;