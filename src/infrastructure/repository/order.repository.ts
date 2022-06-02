import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order_item";
import { OrderRepositoryInterface } from "../../domain/repository/order.repository.interface";
import { OrderItemModel } from "../db/sequelize/model/order_item.model";
import { OrderModel } from "../db/sequelize/model/order.model";

class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: {
        id,
      },
      include: ["items"],
    });
    if (!orderModel) throw new Error("Order not found.");

    let items: OrderItem[] = [];
    if (orderModel.items.length) {
      items = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.product_id,
          item.name,
          item.price,
          item.quantity
        );
      });
    }

    return new Order(id, orderModel.customer_id, items);
  }

  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}

export { OrderRepository };
