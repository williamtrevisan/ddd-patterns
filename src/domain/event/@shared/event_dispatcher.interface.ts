import { EventInterface } from "./event.interface";
import { EventHandlerInterface } from "./event_handler.interface";

interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventName: string, eventHandler: EventHandlerInterface): void;
  unregister(eventName: string, eventHandler: EventHandlerInterface): void;
  unregisterAll(): void;
}

export { EventDispatcherInterface };
