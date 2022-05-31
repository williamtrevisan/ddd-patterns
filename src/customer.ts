import { Address } from "./address";

class Customer {
  _id: string;
  _name: string = "";
  _address!: Address;
  _active: boolean = false;

  constructor (id: string, name: string) {
    this._id = id;
    this._name = name;
    
    this.validate();
  }

  changeName(name: string): void {
    this._name = name;

    this.validate();
  }

  activate() {
    if (!this._address) {
      throw new Error("Address is mandatory to activate a customer.");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set Address(address: Address) {
    this._address = address;
  }

  validate() {
    if (!this._id) throw new Error("Id is required.");

    if (!this._name) throw new Error("Name is required.");
  }
}