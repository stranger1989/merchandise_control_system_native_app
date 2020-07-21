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
