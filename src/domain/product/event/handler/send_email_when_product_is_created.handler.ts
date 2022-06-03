import { EventHandlerInterface } from "../../../@shared/event/event_handler.interface";
import { ProductCreatedEvent } from "../product_created.event";

class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(event: ProductCreatedEvent): void {
    console.log("Sending email to you");
  }
}

export { SendEmailWhenProductIsCreatedHandler };
