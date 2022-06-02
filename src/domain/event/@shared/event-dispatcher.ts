import { EventInterface } from "./event.interface";
import { EventDispatcherInterface } from "./event_dispatcher.interface";
import { EventHandlerInterface } from "./event_handler.interface";

class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    throw new Error("Method not implemented.");
  }
  
  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }
  
  unregister(eventName: string, eventHandler: EventDispatcherInterface): void {
    throw new Error("Method not implemented.");
  }
  
  unregisterAll(): void {
    throw new Error("Method not implemented.");
  }
}

export { EventDispatcher };
