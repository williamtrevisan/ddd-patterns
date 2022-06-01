/* eslint-disable @typescript-eslint/no-unused-vars */
import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Order unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "customerId", []);
    }).toThrowError("Id is required.");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("orderId", "", []);
    }).toThrowError("CustomerId is required.");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      const order = new Order("orderId", "customerId", []);
    }).toThrowError("Items are required.");
  });

  it("should calculate total", () => {
    const item_one = new OrderItem("itemId1", "Item 1", 100);
    const item_two = new OrderItem("itemId2", "Item 2", 200);
    const order_one = new Order("orderId1", "customerId", [item_one]);

    let total = order_one.total();

    expect(total).toBe(100);

    const order_two = new Order("orderId2", "customerId", [item_one, item_two]);

    total = order_two.total();

    expect(total).toBe(300);
  });
});
