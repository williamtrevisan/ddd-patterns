import { CustomerFactory } from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("William");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("William");
    expect(customer.address).toBeUndefined();
  });
});
