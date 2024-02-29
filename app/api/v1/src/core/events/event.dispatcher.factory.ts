import { EventDispatcher } from './event-dispatcher';

/**
 * Factory class responsible for creating instances of the EventDispatcher,
 * implemented as a singleton using lazy initialization.
 */
export class EventDispatcherFactory {
  private static instance: EventDispatcher | null = null;

  /**
   * Creates and returns a single instance of the EventDispatcher.
   * @returns A single EventDispatcher instance.
   */
  public static create(): EventDispatcher {
    if (!EventDispatcherFactory.instance) {
      EventDispatcherFactory.instance = new EventDispatcher();
    }
    return EventDispatcherFactory.instance;
  }
}
