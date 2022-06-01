/* eslint-disable no-underscore-dangle */
import { OrderItem } from "./order_item";

class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}

export { Order };
