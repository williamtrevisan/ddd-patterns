import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { ProductModel } from "../../../product/db/sequelize/product.model";
import { OrderModel } from "./order.model";

@Table({
  tableName: "order_items",
  timestamps: false,
})
class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare order_id: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;

  @Column({ allowNull: false })
  declare quantity: number;
}

export { OrderItemModel };
