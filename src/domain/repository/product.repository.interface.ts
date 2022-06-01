import { Product } from "../entity/product";
import { RepositoryInterface } from "./repository.interface";

type ProductRepositoryInterface = RepositoryInterface<Product>;

export { ProductRepositoryInterface };
