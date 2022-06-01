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
    const item_one = new OrderItem("itemId1", "productId1", "Item 1", 100, 2);
    const item_two = new OrderItem("itemId2", "productId2", "Item 2", 200, 2);
    const order_one = new Order("orderId1", "customerId", [item_one]);

    let total = order_one.total();

    expect(total).toBe(200);

    const order_two = new Order("orderId2", "customerId", [item_one, item_two]);

    total = order_two.total();

    expect(total).toBe(600);
  });

  it("should throw error if the item quantity is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("itemId", "productId", "Item name", 100, 0);
      const ordem = new Order("orderId", "customerId", [item]);
    }).toThrowError("Quantity must be greater than zero.");
  });
});
