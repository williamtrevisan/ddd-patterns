import { Customer } from "../entity/customer";
import { RepositoryInterface } from "./repository.interface";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}

export { CustomerRepositoryInterface };
