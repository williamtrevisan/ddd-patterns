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
  
  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (this.eventHandlers[eventName]) {
      const eventIndex = this.eventHandlers[eventName].indexOf(eventHandler);
      if (eventIndex !== -1) {
        this.eventHandlers[eventName].splice(eventIndex, 1);
      }
    }
  }
  
  unregisterAll(): void {
    throw new Error("Method not implemented.");
  }
}

export { EventDispatcher };
