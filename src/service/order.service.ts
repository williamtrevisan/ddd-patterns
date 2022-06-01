import { Order } from "../entity/order";

class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}

export { OrderService };
