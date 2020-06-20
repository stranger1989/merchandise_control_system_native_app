import axios from 'axios';

import { Item } from './models';

interface ApiConfig {
  baseURL: string;
  timeout: number;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: 'http://localhost:8080',
  timeout: 10000,
};

export const fetchItemsFactory = (optionConfig?: ApiConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };
  const instance = axios.create(config);

  const fetchItems = async () => {
    try {
      const response = await instance.get('/items');

      if (response.status !== 200) {
        throw new Error('Server Error');
      }
      const items: Item[] = response.data;

      return items;
    } catch (err) {
      throw err;
    }
  };

  return fetchItems;
};
