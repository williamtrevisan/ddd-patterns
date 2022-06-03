import { ProductFactory } from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a product", () => {
    const product = ProductFactory.create("Product name X", 10);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product name X");
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe("Product");
  });
});
