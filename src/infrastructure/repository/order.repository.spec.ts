import { Sequelize } from "sequelize-typescript";

import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order_item";
import { Product } from "../../domain/entity/product";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { OrderItemModel } from "../db/sequelize/model/order_item.model";
import { OrderModel } from "../db/sequelize/model/order.model";
import { ProductModel } from "../db/sequelize/model/product.model";
import { CustomerRepository } from "./customer.repository";
import { OrderRepository } from "./order.repository";
import { ProductRepository } from "./product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customerId", "Customer name");
    const address = new Address("Street", 1, "postalCode", "City name");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("productId", "Product name", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "orderItemId",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("orderId", "customerId", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "orderId",
      customer_id: "customerId",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          order_id: "orderId",
          product_id: "productId",
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
        },
      ],
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customerId", "Customer name");
    const address = new Address("Street", 1, "postalCode", "City name");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("productId", "Product name", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "orderItemId",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("orderId", "customerId", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderResult = await orderRepository.find(order.id);

    expect(order).toStrictEqual(orderResult);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customerOne = new Customer("customerId", "Customer name");
    const addressOne = new Address("Street", 1, "postalCode", "City name");
    customerOne.changeAddress(addressOne);
    await customerRepository.create(customerOne);

    const productRepository = new ProductRepository();
    const productOne = new Product("productId", "Product name", 10);
    await productRepository.create(productOne);

    const orderItemOne = new OrderItem(
      "orderItemId",
      productOne.id,
      productOne.name,
      productOne.price,
      2
    );

    const customerTwo = new Customer("customerId", "Customer name");
    const addressTwo = new Address("Street", 1, "postalCode", "City name");
    customerTwo.changeAddress(addressTwo);
    await customerRepository.create(customerTwo);

    const productTwo = new Product("productId", "Product name", 10);
    await productRepository.create(productTwo);

    const orderItemTwo = new OrderItem(
      "orderItemId",
      productTwo.id,
      productTwo.name,
      productTwo.price,
      2
    );

    const orderOne = new Order("orderIdOne", "customerIdOne", [orderItemOne]);
    const orderTwo = new Order("orderIdTwo", "customerIdTwo", [
      orderItemOne,
      orderItemTwo,
    ]);

    const orderRepository = new OrderRepository();
    orderRepository.create(orderOne);
    orderRepository.create(orderTwo);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(orderOne);
    expect(orders).toContainEqual(orderTwo);
  });
});
