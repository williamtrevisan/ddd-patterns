import { OrderItem } from "./order_item";

class Order {
  id: string;
  customerId: string;
  items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
  }
}

export { Order };
