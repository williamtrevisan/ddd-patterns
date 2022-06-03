/* eslint-disable @typescript-eslint/no-unused-vars */
import { Address } from "../value_object/address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "Customer name");
    }).toThrowError("Id is required.");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer("customerId", "");
    }).toThrowError("Name is required.");
  });

  it("should change name", () => {
    const customer = new Customer("customerId", "Customer name");

    customer.changeName("Customer name edited");

    expect(customer.name).toBe("Customer name edited");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address(
      "Street 1",
      123,
      "95700-000",
      "Bento Gonçalves"
    );
    customer.address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("customerId", "Customer name");

      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer.");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("customerId", "Customer name");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("customerId", "Customer name");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
