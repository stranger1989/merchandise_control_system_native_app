import { IndexPath } from '@ui-kitten/components';

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
