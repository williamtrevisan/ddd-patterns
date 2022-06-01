import { Order } from "../entity/order";
import { RepositoryInterface } from "./repository.interface";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OrderRepositoryInterface extends RepositoryInterface<Order> {}

export { OrderRepositoryInterface };
