import { EventHandlerInterface } from "../../@shared/event_handler.interface";
import { CustomerCreatedEvent } from "../custumer_created.event";

class SendConsoleLog1WhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated.");
  }
}

export { SendConsoleLog1WhenCustomerIsCreatedHandler };
