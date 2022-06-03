import { Sequelize } from "sequelize-typescript";

import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value_object/address";
import { Product } from "../../../../domain/product/entity/product";
import { CustomerModel } from "../../../customer/db/sequelize/customer.model";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import { ProductModel } from "../../../product/db/sequelize/product.model";
import { ProductRepository } from "../../../product/repository/sequelize/product.repository";
import { OrderItemModel } from "../../db/sequelize/order_item.model";
import { OrderModel } from "../../db/sequelize/order.model";
import { OrderRepository } from "./order.repository";

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
          id: orderItem.id,
          order_id: "orderId",
          product_id: "productId",
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customerId", "Customer name");
    const address = new Address("Street", 1, "postalCode", "City name");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("productId1", "Product name 1", 30);
    await productRepository.create(product1);
    const product2 = new Product("productId2", "Product name 2", 20);
    await productRepository.create(product2);
    const product3 = new Product("productId3", "Product name 3", 10);
    await productRepository.create(product3);

    const item1 = new OrderItem(
      "itemId1",
      product1.id,
      product1.name,
      product1.price,
      3
    );
    const item2 = new OrderItem(
      "itemId2",
      product2.id,
      product2.name,
      product2.price,
      2
    );
    const item3 = new OrderItem(
      "itemId3",
      product3.id,
      product3.name,
      product3.price,
      1
    );

    const order = new Order("orderId", "customerId", [item1, item2, item3]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order.deleteItems([item2.id]);

    await orderRepository.update(order);

    let orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "orderId",
      customer_id: "customerId",
      total: order.total(),
      items: [
        {
          id: item1.id,
          order_id: "orderId",
          product_id: "productId1",
          name: item1.name,
          price: item1.price,
          quantity: item1.quantity,
        },
        {
          id: item3.id,
          order_id: "orderId",
          product_id: "productId3",
          name: item3.name,
          price: item3.price,
          quantity: item3.quantity,
        },
      ],
    });

    order.addItems([item2]);

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
          id: item1.id,
          order_id: "orderId",
          product_id: "productId1",
          name: item1.name,
          price: item1.price,
          quantity: item1.quantity,
        },
        {
          id: item3.id,
          order_id: "orderId",
          product_id: "productId3",
          name: item3.name,
          price: item3.price,
          quantity: item3.quantity,
        },
        {
          id: item2.id,
          order_id: "orderId",
          product_id: "productId2",
          name: item2.name,
          price: item2.price,
          quantity: item2.quantity,
        },
      ],
    });

    item3.changeQuantity(4);

    await orderRepository.update(order);

    orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "orderId",
      customer_id: "customerId",
      total: 170,
      items: [
        {
          id: item1.id,
          order_id: "orderId",
          product_id: "productId1",
          name: item1.name,
          price: item1.price,
          quantity: item1.quantity,
        },
        {
          id: item3.id,
          order_id: "orderId",
          product_id: "productId3",
          name: item3.name,
          price: item3.price,
          quantity: 4,
        },
        {
          id: item2.id,
          order_id: "orderId",
          product_id: "productId2",
          name: item2.name,
          price: item2.price,
          quantity: item2.quantity,
        },
      ],
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customerId", "Customer name");
    const address = new Address("Street", 1, "postalCode", "City name");
    customer.changeAddress(address);
    customer.activate();
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

  it("should throw a error if dont find a order", () => {
    expect(async () => {
      const orderRepository = new OrderRepository();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const orderResult = await orderRepository.find("orderId");
    }).rejects.toThrow("Order not found.");
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("customerId1", "Customer name 1");
    const address1 = new Address("Street1", 1, "postalCode1", "City name 1");
    customer1.address = address1;
    customer1.activate();
    await customerRepository.create(customer1);

    const productRepository = new ProductRepository();
    const product1 = new Product("productId1", "Product name 1", 10);
    await productRepository.create(product1);

    const orderItem1 = new OrderItem(
      "orderItemId1",
      product1.id,
      product1.name,
      product1.price,
      2
    );

    const product2 = new Product("productId2", "Product name 2", 20);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "orderItemId2",
      product2.id,
      product2.name,
      product2.price,
      1
    );

    const product3 = new Product("productId3", "Product name 3", 40);
    await productRepository.create(product3);

    const orderItem3 = new OrderItem(
      "orderItemId3",
      product3.id,
      product3.name,
      product3.price,
      3
    );

    const order1 = new Order("orderId1", "customerId1", [orderItem1]);
    const order2 = new Order("orderId2", "customerId1", [
      orderItem2,
      orderItem3,
    ]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });
});
