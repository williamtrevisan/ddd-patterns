import { EventDispatcherInterface } from "./event_dispatcher.interface";
import { EventHandlerInterface } from "./event_handler.interface";
import { EventInterface } from "./event.interface";

class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;

    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
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
    this.eventHandlers = {};
  }
}

export { EventDispatcher };
