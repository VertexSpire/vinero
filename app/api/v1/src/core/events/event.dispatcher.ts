// src/core/events/event-dispatcher.ts

import { Event, EventListener } from './';

/**
 * @class EventDispatcher
 * @description Class responsible for dispatching events and managing listeners. The EventDispatcher provides a mechanism
 * to register event listeners for specific event types and dispatch events to these listeners. It ensures that all registered
 * listeners are notified when an event of their interest is dispatched.
 */
export class EventDispatcher {
 /**
  * @property {Object} listeners - Internal mapping of event names to their registered listeners. This object holds arrays
  * of listeners for each event type, allowing the EventDispatcher to efficiently manage and notify the appropriate listeners
  * when an event is dispatched.
  */
 private readonly listeners: { [eventName: string]: EventListener[] } = {};

 /**
  * @method register
  * @description Registers an event listener for a specific event type. This method allows clients to subscribe to events
  * of a particular type by providing an event class and a listener function. When an event of the specified type is dispatched,
  * the listener function will be called.
  *
  * @param {new () => T} event - The event class representing the event to listen for. This parameter specifies the type of event
  * to listen for and should be a class that extends the Event interface.
  * @param {EventListener<T>} listener - The function to be called when the event is dispatched. This function should implement the
  * EventListener interface and handle the event appropriately.
  * @template T - The type of event being listened for. This generic type parameter ensures type safety, allowing the listener function
  * to receive the correct event type.
  */
 public register<T extends Event>(event: new () => T, listener: EventListener<T>): void {
  const eventName = event.name;
  if (!this.listeners[eventName]) {
   this.listeners[eventName] = [];
  }
  this.listeners[eventName].push(listener);
 }

 /**
  * @method dispatch
  * @description Dispatches an event to all registered listeners for its specific type. This method takes an event object and notifies
  * all listeners that have registered for the event's type, invoking their handle method with the event object. This allows multiple
  * parts of the application to react to events in a decoupled manner.
  *
  * @param {Event} event - The event object to be dispatched. This object should contain all the necessary information about the event
  * and implement the Event interface. It is passed to the handle method of each registered listener.
  */
 public dispatch(event: Event): void {
  if (this.listeners[event.name]) {
   this.listeners[event.name].forEach((listener) => listener.handle(event));
  }
 }
}
