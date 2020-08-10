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
    case ActionType.POST_ITEM_START:
    case ActionType.DELETE_ITEM_START:
    case ActionType.UPDATE_ITEM_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.FETCH_ITEMS_SUCCEED:
    case ActionType.POST_ITEM_SUCCEED:
    case ActionType.DELETE_ITEM_SUCCEED:
    case ActionType.UPDATE_ITEM_SUCCEED:
      return {
        ...state,
        items: action.payload.result.items,
        isLoading: false,
      };
    case ActionType.FETCH_ITEMS_FAIL:
    case ActionType.POST_ITEM_FAIL:
    case ActionType.DELETE_ITEM_FAIL:
    case ActionType.UPDATE_ITEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default: {
      return state;
    }
  }
};

export default itemReducer;
