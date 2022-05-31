class Address {
  street = "";
  number = 0;
  zip = "";
  city = "";

  constructor(street: string, number: number, zip: string, city: string) {
    this.street = street;
    this.number = number;
    this.zip = zip;
    this.city = city;

    this.validate();
  }

  validate() {
    if (!this.street) throw new Error("Street is required.");

    if (!this.number) throw new Error("Number is required.");

    if (!this.zip) throw new Error("Zip is required.");

    if (!this.city) throw new Error("City is required.");
  }
}

export { Address };
