/**
 * Interface defining the basic structure of an event object.
 */
export interface Event {
  /**
   * The unique name of the event.
   */
  readonly name: string;
}

/**
 * Interface defining the required method for event listeners.
 */
export interface EventListener<T extends Event> {
  /**
   * The function to be called when the event is dispatched.
   */
  handle(event: T): void;
}
