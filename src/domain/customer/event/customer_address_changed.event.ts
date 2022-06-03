/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventInterface } from "../../@shared/event/event.interface";

class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}

export { CustomerAddressChangedEvent };
