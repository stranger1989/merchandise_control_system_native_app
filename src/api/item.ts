import axios from 'axios';
import { EXPO_MAIN_API_BASE_URL } from 'react-native-dotenv';
import { IndexPath } from '@ui-kitten/components';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = EXPO_MAIN_API_BASE_URL;

export interface ItemId {
  id: number;
}

export interface ItemModel extends ItemId {
  jan_code: string;
  item_name: string;
  price: number;
  category_id: number;
  series_id: number;
  stock: number;
  discontinued: boolean;
  release_date: Date;
}

export interface ItemFormModel extends ItemId {
  jan_code: string;
  item_name: string;
  price: string;
  category_id: IndexPath;
  series_id: IndexPath;
  stock: string;
  discontinued: boolean;
  release_date: Date;
}

export const fetchItemsApi = async () => {
  try {
    const response = await axios.get('/items');

    if (response.status !== 200) {
      throw new Error('The request has failed');
    }
    const items: ItemModel[] = response.data;

    return items;
  } catch (err) {
    throw err;
  }
};

export const postItemApi = async (params: ItemModel) => {
  try {
    const response = await axios.post('/item', params);

    if (response.status !== 201) {
      throw new Error('The request has failed');
    }
    const item: ItemModel = response.data;

    return item;
  } catch (err) {
    throw err;
  }
};

export const deleteItemApi = async (itemId: ItemId) => {
  try {
    const response = await axios.delete(`/item/${itemId.id}`);

    if (response.status !== 200) {
      throw new Error('The request has failed');
    }
    const responseId: ItemId = response.data;

    return responseId;
  } catch (err) {
    throw err;
  }
};

export const updateItemApi = async (params: {
  params: ItemModel;
  itemId: ItemId;
}) => {
  try {
    const response = await axios.put(
      `/item/${params.itemId.id}`,
      params.params,
    );

    if (response.status !== 200) {
      throw new Error('The request has failed');
    }
    const item: ItemModel = response.data;

    return item;
  } catch (err) {
    throw err;
  }
};
