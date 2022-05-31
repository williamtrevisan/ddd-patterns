/* eslint-disable no-underscore-dangle */
import { Address } from "./address";

class Customer {
  private _id: string;
  private _name = "";
  private _address!: Address;
  private _active = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  changeName(name: string): void {
    this._name = name;

    this.validate();
  }

  activate() {
    if (!this.address) {
      throw new Error("Address is mandatory to activate a customer.");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  get name(): string {
    return this._name;
  }

  set address(address: Address) {
    this._address = address;
  }

  get address(): Address {
    return this._address;
  }

  validate() {
    if (!this._id) throw new Error("Id is required.");

    if (!this._name) throw new Error("Name is required.");
  }
}

export { Customer };
