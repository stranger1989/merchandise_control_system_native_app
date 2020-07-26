import axios from 'axios';
import { EXPO_MAIN_API_BASE_URL } from 'react-native-dotenv';

import { ItemId, ItemModel } from './models';

interface ApiConfig {
  baseURL: string;
  timeout: number;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: EXPO_MAIN_API_BASE_URL,
  timeout: 10000,
};

const createAxiosInstance = (optionConfig?: ApiConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };
  const instance = axios.create(config);

  return instance;
};

export const fetchItemsApi = (optionConfig?: ApiConfig) => {
  const instance = createAxiosInstance(optionConfig);

  const fetchItems = async () => {
    try {
      const response = await instance.get('/items');

      if (response.status !== 200) {
        throw new Error('URI not found or Server Error');
      }
      const items: ItemModel[] = response.data;

      return items;
    } catch (err) {
      throw err;
    }
  };

  return fetchItems;
};

export const postItemApi = (params: ItemModel, optionConfig?: ApiConfig) => {
  const instance = createAxiosInstance(optionConfig);

  const postItem = async () => {
    try {
      const response = await instance.post('/item', params);

      if (response.status !== 200) {
        throw new Error('URI not found or Server Error');
      }
      const item: ItemModel = response.data;

      return item;
    } catch (err) {
      throw err;
    }
  };

  return postItem;
};

export const deleteItemApi = (itemId: ItemId, optionConfig?: ApiConfig) => {
  const instance = createAxiosInstance(optionConfig);

  const deleteItem = async () => {
    try {
      const response = await instance.delete(`/item/${itemId.id}`);

      if (response.status !== 200) {
        throw new Error('URI not found or Server Error');
      }
      const responseId: ItemId = response.data;

      return responseId;
    } catch (err) {
      throw err;
    }
  };

  return deleteItem;
};

export const updateItemApi = (
  params: { params: ItemModel; itemId: ItemId },
  optionConfig?: ApiConfig,
) => {
  const instance = createAxiosInstance(optionConfig);

  const updateItem = async () => {
    try {
      const response = await instance.put(
        `/item/${params.itemId.id}`,
        params.params,
      );

      if (response.status !== 200) {
        throw new Error('URI not found or Server Error');
      }
      const item: ItemModel = response.data;

      return item;
    } catch (err) {
      throw err;
    }
  };

  return updateItem;
};
