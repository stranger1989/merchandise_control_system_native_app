import { Reducer } from 'redux';
import { AxiosError } from 'axios';

import { ItemAction } from '../actions/item';
import * as ActionType from '../actions/itemConstants';
import { ItemModel } from '../services/item/models';

export interface ItemState {
  items: ItemModel[];
  isLoading: boolean;
  error?: AxiosError | null;
}

export const initialState: ItemState = {
  items: [],
  isLoading: false,
};

const itemReducer: Reducer<ItemState, ItemAction> = (
  state: ItemState = initialState,
  action: ItemAction,
): ItemState => {
  switch (action.type) {
    case ActionType.FETCH_ITEMS_START:
      return {
        ...state,
        items: [],
        isLoading: true,
      };
    case ActionType.FETCH_ITEMS_SUCCEED:
      return {
        ...state,
        items: action.payload.result.items,
        isLoading: false,
      };
    case ActionType.FETCH_ITEMS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _ = action as never;

      return state;
    }
  }
};

export default itemReducer;
