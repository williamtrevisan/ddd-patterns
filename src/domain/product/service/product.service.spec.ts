import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const product_one = new Product("productId", "Product name", 10);
    const product_two = new Product("productId", "Product name", 20);

    ProductService.increasePrice([product_one, product_two], 100);

    expect(product_one.price).toBe(20);
    expect(product_two.price).toBe(40);
  });
});
