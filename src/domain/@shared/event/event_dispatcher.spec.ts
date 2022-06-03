import { Customer } from "../../customer/entity/customer";
import { CustomerAddressChangedEvent } from "../../customer/event/customer_address_changed.event";
import { CustomerCreatedEvent } from "../../customer/event/custumer_created.event";
import { SendConsoleLog1WhenCustomerIsCreatedHandler } from "../../customer/event/handler/send_console_log_1_when_customer_is_created";
import { SendConsoleLog2WhenCustomerIsCreatedHandler } from "../../customer/event/handler/send_console_log_2_when_customer_is_created";
import { SendConsoleLogWhenCustomerAddressIsChangedHandler } from "../../customer/event/handler/send_console_log_when_customer_address_is_changed";
import { Address } from "../../customer/value_object/address";
import { SendEmailWhenProductIsCreatedHandler } from "../../product/event/handler/send_email_when_product_is_created.handler";
import { ProductCreatedEvent } from "../../product/event/product_created.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined();
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(1);
    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined();
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product name",
      description: "Product description",
      price: 10.0,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should notify all event handlers for CustumerCreatedEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    const logSpy1 = jest.spyOn(console, "log");
    const logSpy2 = jest.spyOn(console, "log");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers.CustomerCreatedEvent[1]
    ).toMatchObject(eventHandler2);

    const customer = new Customer("customerId", "Customer name");
    const address = new Address("Street name", 1, "Zipcode", "City name");
    customer.changeAddress(address);
    customer.activate();

    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
    expect(logSpy1).toHaveBeenCalledWith(
      "Esse é o primeiro console.log do evento: CustomerCreated."
    );
    expect(logSpy2).toHaveBeenCalledWith(
      "Esse é o segundo console.log do evento: CustomerCreated."
    );
  });

  it("should notify event handlers for CustumerAddressChangedEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler =
      new SendConsoleLogWhenCustomerAddressIsChangedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const logSpy = jest.spyOn(console, "log");

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers.CustomerAddressChangedEvent[0]
    ).toMatchObject(eventHandler);

    const customer = new Customer("customerId", "Customer name");
    const address = new Address("Street name", 1, "Zipcode", "City name");
    customer.changeAddress(address);
    customer.activate();

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      customer
    );

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Endereço do cliente: customerId, Customer name alterado para: 1 Street name, City name, Zipcode"
    );

    const address2 = new Address(
      "Street name 2",
      2,
      "Zipcode 2",
      "City name 2"
    );
    customer.changeAddress(address2);

    const customerAddressChangedEvent2 = new CustomerAddressChangedEvent(
      customer
    );

    eventDispatcher.notify(customerAddressChangedEvent2);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Endereço do cliente: customerId, Customer name alterado para: 2 Street name 2, City name 2, Zipcode 2"
    );
  });
});
