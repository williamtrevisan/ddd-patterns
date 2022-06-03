import { RepositoryInterface } from "../../@shared/repository/repository.interface";
import { Product } from "../entity/product";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProductRepositoryInterface extends RepositoryInterface<Product> {}

export { ProductRepositoryInterface };
