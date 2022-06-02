import { EventInterface } from "./event.interface";
import { EventDispatcherInterface } from "./event_dispatcher.interface";
import { EventHandlerInterface } from "./event_handler.interface";

class EventDispatcher implements EventDispatcherInterface {
  notify(event: EventInterface): void {
    throw new Error("Method not implemented.");
  }
  
  register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    throw new Error("Method not implemented.");
  }
  
  unregister(eventName: string, eventHandler: EventDispatcherInterface): void {
    throw new Error("Method not implemented.");
  }
  
  unregisterAll(): void {
    throw new Error("Method not implemented.");
  }
}

export { EventDispatcher };
