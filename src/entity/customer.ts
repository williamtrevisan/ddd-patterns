import { Address } from "./address";

class Customer {
  id: string;
  name = "";
  address!: Address;
  active = false;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;

    this.validate();
  }

  changeName(name: string): void {
    this.name = name;

    this.validate();
  }

  activate() {
    if (!this.address) {
      throw new Error("Address is mandatory to activate a customer.");
    }

    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  set Address(address: Address) {
    this.address = address;
  }

  validate() {
    if (!this.id) throw new Error("Id is required.");

    if (!this.name) throw new Error("Name is required.");
  }
}

export { Customer };
