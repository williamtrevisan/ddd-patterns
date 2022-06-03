describe("Product factory unit test", () => {
  it("should create a product type", () => {
    const product = ProductFactory.create("productTypeX", "Product name X", 10);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product name X");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });
});
