import { v4 as uuidV4 } from "uuid";

import { Customer } from "../entity/customer";
import { Address } from "../value_object/address";

class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(uuidV4(), name);
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuidV4(), name);
    customer.changeAddress(address);

    return customer;
  }

  public static createWithAddressAndActive(
    name: string,
    address: Address
  ): Customer {
    const customer = new Customer(uuidV4(), name);
    customer.changeAddress(address);
    customer.activate();

    return customer;
  }
}

export { CustomerFactory };
