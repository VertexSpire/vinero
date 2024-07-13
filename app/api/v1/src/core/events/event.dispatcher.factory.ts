// src/core/events/event-dispatcher.factory.ts

import { EventDispatcher } from './event-dispatcher';

/**
 * @class EventDispatcherFactory
 * @description Factory class responsible for creating instances of the EventDispatcher, implemented as a singleton using lazy initialization.
 * The EventDispatcherFactory ensures that only one instance of EventDispatcher is created and shared throughout the application,
 * promoting efficient resource usage and consistent event handling.
 */
export class EventDispatcherFactory {
 /**
  * @property {EventDispatcher | null} instance - Holds the single instance of EventDispatcher. Initially set to null, it is instantiated
  * only when the create method is called for the first time. This approach follows the lazy initialization pattern, where the instance
  * is created only when needed.
  */
 private static instance: EventDispatcher | null = null;

 /**
  * @method create
  * @description Creates and returns a single instance of the EventDispatcher. If the instance already exists, it returns the existing
  * instance. If the instance does not exist, it creates a new one, assigns it to the static instance property, and then returns it.
  * This method ensures that the same EventDispatcher instance is used throughout the application, adhering to the singleton pattern.
  *
  * @returns {EventDispatcher} - A single EventDispatcher instance. This instance is either newly created or the existing one if it was
  * previously created.
  */
 public static create(): EventDispatcher {
  if (!EventDispatcherFactory.instance) {
   EventDispatcherFactory.instance = new EventDispatcher();
  }
  return EventDispatcherFactory.instance;
 }
}
