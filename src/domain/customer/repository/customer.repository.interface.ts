import { RepositoryInterface } from "../../@shared/repository/repository.interface";
import { Customer } from "../entity/customer";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}

export { CustomerRepositoryInterface };
