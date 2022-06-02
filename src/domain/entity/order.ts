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

    this.validate();
  }

  addItems(items: OrderItem[]): void {
    items.forEach((item) => {
      this._items.push(item);
    });
  }

  deleteItems(itemsId: string[]): void {
    itemsId.forEach((itemId) => {
      const itemIndex = this._items.findIndex((item) => item.id === itemId);
      if (itemIndex < 0) return;

      this._items.splice(itemIndex, 1);
    });
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.totalPrice(), 0);
  }

  validate() {
    if (!this._id) throw new Error("Id is required.");

    if (!this._customerId) throw new Error("CustomerId is required.");

    if (!this._items.length) throw new Error("Items are required.");

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than zero.");
    }
  }
}

export { Order };
