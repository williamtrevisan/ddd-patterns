class Address {
  _street: string = "";
  _number: number = 0;
  _zip: string = "";
  _city: string = "";

  constructor (street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  validate() {
    if (!this._street) throw new Error("Street is required.");
    
    if (!this._number) throw new Error("Number is required.");
    
    if (!this._zip) throw new Error("Zip is required.");
    
    if (!this._city) throw new Error("City is required.");
  }
}

export { Address };
