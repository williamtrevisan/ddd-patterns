import { v4 as uuidV4 } from "uuid";

import { Customer } from "../../customer/entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";

class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (!items.length) throw new Error("Order must have at least one item.");

    const order = new Order(uuidV4(), customer.id, items);

    customer.addRewardPoints(order.total() / 2);

    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}

export { OrderService };
