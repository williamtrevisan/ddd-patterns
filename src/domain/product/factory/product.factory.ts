import { v4 as uuidV4 } from "uuid";

import { Product } from "../entity/product";
import { ProductInterface } from "../entity/product.interface";

class ProductFactory {
  public static create(name: string, price: number): ProductInterface {
    return new Product(uuidV4(), name, price);
  }
}

export { ProductFactory };
