import { Sequelize } from "sequelize-typescript";

import { Product } from "../../domain/entity/product";
import { ProductModel } from "../db/sequelize/model/product.model";
import { ProductRepository } from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("productId", "Product name", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: "productId" },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "productId",
      name: "Product name",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("productId", "Product name", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: "productId" },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "productId",
      name: "Product name",
      price: 100,
    });

    product.changeName("Product name edited");
    product.changePrice(150);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({
      where: { id: "productId" },
    });

    expect(productModel2?.toJSON()).toStrictEqual({
      id: "productId",
      name: "Product name edited",
      price: 150,
    });
  });
});
