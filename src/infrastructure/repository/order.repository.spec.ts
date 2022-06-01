import { Sequelize } from "sequelize-typescript";
import { v4 as uuidV4 } from "uuid";

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

describe("Customer repository test", () => {
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

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customerId", "Customer name");
    const address = new Address("Street", 1, "postalCode", "City name");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("productIdOne", "Product name", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "orderItemIdOne",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("orderId", "customerId", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order.removeItems([product.id]);
    await orderRepository.update(order);

    let orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "orderId",
      customer_id: "customerId",
      total: order.total(),
      items: [],
    });

    const orderItemOne = new OrderItem(
      "orderItemIdOne",
      product.id,
      product.name,
      product.price,
      4
    );

    order.addItems([orderItemOne]);
    await orderRepository.update(order);

    orderModel = await OrderModel.findOne({
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
          product_id: "productIdOne",
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
        },
      ],
    });

    orderItemOne.changeQuantity(1);
    await orderRepository.update(order);

    orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "orderId",
      customer_id: "customerId",
      total: order.total(),
      items: [
        {
          id: orderItemOne.id,
          order_id: "orderId",
          product_id: "productIdOne",
          name: orderItemOne.name,
          price: orderItemOne.price,
          quantity: 1,
        },
      ],
    });

    const product_two = new Product("productTwo", "Product name two", 35);
    await productRepository.create(product_two);

    const orderItemTwo = new OrderItem(
      "orderItemIdTwo",
      product_two.id,
      product_two.name,
      product_two.price,
      1
    );

    const product_three = new Product("productThree", "Product name three", 60);
    await productRepository.create(product_three);

    const orderItemThree = new OrderItem(
      "orderItemIdThree",
      product_three.id,
      product_three.name,
      product_three.price,
      2
    );

    order.addItems([orderItemTwo, orderItemThree]);
    await orderRepository.update(order);

    orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "orderId",
      customer_id: "customerId",
      total: order.total(),
      items: [
        {
          id: orderItemOne.id,
          order_id: "orderId",
          product_id: "productIdOne",
          name: orderItemOne.name,
          price: orderItemOne.price,
          quantity: orderItemOne.quantity,
        },
        {
          id: orderItemTwo.id,
          order_id: "orderId",
          product_id: "productIdTwo",
          name: orderItemTwo.name,
          price: orderItemTwo.price,
          quantity: orderItemTwo.quantity,
        },
        {
          id: orderItemThree.id,
          order_id: "orderId",
          product_id: "productIdThree",
          name: orderItemThree.name,
          price: orderItemThree.price,
          quantity: orderItemThree.quantity,
        },
      ],
    });

    order.removeItems([product_two.id]);
    await orderRepository.update(order);

    orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "orderId",
      customer_id: "customerId",
      total: order.total(),
      items: [
        {
          id: orderItemOne.id,
          order_id: "orderId",
          product_id: "productIdOne",
          name: orderItemOne.name,
          price: orderItemOne.price,
          quantity: orderItemOne.quantity,
        },
        {
          id: orderItemThree.id,
          order_id: "orderId",
          product_id: "productIdThree",
          name: orderItemThree.name,
          price: orderItemThree.price,
          quantity: orderItemThree.quantity,
        },
      ],
    });
  });
});
