import { Customer } from "../../customer/entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";
import { OrderService } from "./order.service";

describe("Order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("customerId", "Customer name");
    const orderItem = new OrderItem("itemId", "productId", "Item name", 10, 1);

    const order = OrderService.placeOrder(customer, [orderItem]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should get total of all orders", () => {
    const orderItem = new OrderItem("itemId", "productId", "Item name", 100, 1);
    const orderItem2 = new OrderItem(
      "itemId2",
      "productId",
      "Item name 2",
      200,
      2
    );
    const order = new Order("orderId", "customerId", [orderItem]);
    const order2 = new Order("orderId2", "customerId", [orderItem2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(500);
  });
});
