import { RepositoryInterface } from "../../@shared/repository/repository.interface";
import { Order } from "../entity/order";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OrderRepositoryInterface extends RepositoryInterface<Order> {}

export { OrderRepositoryInterface };
