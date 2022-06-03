import { EventHandlerInterface } from "../../@shared/event_handler.interface";
import { CustomerAddressChangedEvent } from "../customer_address_changed.event";

class SendConsoleLogWhenCustomerAddressIsChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle(event: CustomerAddressChangedEvent): void {
    console.log(event.eventData);
  }
}

export { SendConsoleLogWhenCustomerAddressIsChangedHandler };
