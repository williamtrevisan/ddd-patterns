import { Product } from "../entity/product";
import { RepositoryInterface } from "./repository.interface";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProductRepositoryInterface extends RepositoryInterface<Product> {}

export { ProductRepositoryInterface };
