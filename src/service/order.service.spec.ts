import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";
import { OrderService } from "./order.service";

describe("Order service unit tests", () => {
  it("should get total of all orders", () => {
    const orderItem = new OrderItem("itemId", "Item name", 100, "productId", 1);
    const orderItem2 = new OrderItem("itemId2", "Item name 2", 200, "productId", 2);
    const order = new Order("orderId", "customerId", [orderItem]);
    const order2 = new Order("orderId2", "customerId", [orderItem2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(500);
  });
});