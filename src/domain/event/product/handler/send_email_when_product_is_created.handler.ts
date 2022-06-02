import { EventHandlerInterface } from "../../@shared/event_handler.interface";
import { ProductCreatedEvent } from "../product_created.event";

class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to you`);
  }

}

export { SendEmailWhenProductIsCreatedHandler };
