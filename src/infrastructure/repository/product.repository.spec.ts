import { Sequelize } from "sequelize-typescript";

import { Product } from "../../domain/entity/product";
import {
  ProductModel,
  ProductModel,
} from "../db/sequelize/model/product.model";

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
    const productRepository = new ProductRepository(sequelize);
    const product = new Product("productId", "Product name", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: "productId " },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "productId",
      name: "Product name",
      price: 100,
    });
  });
});
