import { Address } from "../value_object/address";
import { CustomerFactory } from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("William");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("William");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Street name", 1, "zipcode", "City name");

    const customer = CustomerFactory.createWithAddress("William", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("William");
    expect(customer.address).toBe(address);
  });

  it("should create a customer with address and activated", () => {
    const address = new Address("Street name", 1, "zipcode", "City name");

    const customer = CustomerFactory.createWithAddressAndActive(
      "William",
      address
    );

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("William");
    expect(customer.isActive()).toBeTruthy();
    expect(customer.address).toBe(address);
  });
});
