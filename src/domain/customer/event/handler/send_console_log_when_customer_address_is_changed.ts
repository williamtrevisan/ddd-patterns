import { EventHandlerInterface } from "../../../@shared/event/event_handler.interface";
import { CustomerAddressChangedEvent } from "../customer_address_changed.event";

class SendConsoleLogWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.number} ${event.eventData.address.street}, ${event.eventData.address.city}, ${event.eventData.address.zip}`
    );
  }
}

export { SendConsoleLogWhenCustomerAddressIsChangedHandler };
