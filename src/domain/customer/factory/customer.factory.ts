import { v4 as uuidV4 } from "uuid";

import { Customer } from "../entity/customer";

class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(uuidV4(), name);
  }
}

export { CustomerFactory };
