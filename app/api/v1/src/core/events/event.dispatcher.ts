import { Event, EventListener } from './';

/**
 * Class responsible for dispatching events and managing listeners.
 */
export class EventDispatcher {
  /**
   * Internal mapping of event names to their registered listeners.
   */
  private readonly listeners: { [eventName: string]: EventListener[] } = {};

  /**
   * Registers an event listener for a specific event type.
   * @param event - The event class representing the event to listen for.
   * @param listener - The function to be called when the event is dispatched.
   */
  public register<T extends Event>(event: new () => T, listener: EventListener<T>): void {
    const eventName = event.name;
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  /**
   * Dispatches an event to all registered listeners for its specific type.
   * @param event - The event object to be dispatched.
   */
  public dispatch(event: Event): void {
    if (this.listeners[event.name]) {
      this.listeners[event.name].forEach((listener) => listener.handle(event));
    }
  }
}
