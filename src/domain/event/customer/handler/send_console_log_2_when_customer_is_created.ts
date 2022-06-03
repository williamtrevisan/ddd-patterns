import { EventHandlerInterface } from "../../@shared/event_handler.interface";
import { CustomerCreatedEvent } from "../custumer_created.event";

class SendConsoleLog2WhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated.");
  }
}

export { SendConsoleLog2WhenCustomerIsCreatedHandler };
