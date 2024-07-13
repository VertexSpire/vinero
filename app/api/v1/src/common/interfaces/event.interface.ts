// src/common/interfaces/event.interface.ts

/**
 * @interface Event
 * @description Interface defining the basic structure of an event object. This interface provides a standard format
 * for events used within the application, ensuring consistency and facilitating the implementation of event-driven
 * architectures.
 *
 * Properties:
 * - name: A read-only string representing the unique name of the event. This property is essential for identifying
 *   the type of event being dispatched and handled.
 */
export interface Event {
 /**
  * @property {string} name - The unique name of the event. This property is read-only and must be specified when
  * the event object is created. It serves as the identifier for the event, allowing event listeners to determine
  * which events they should handle.
  */
 readonly name: string;
}

/**
 * @interface EventListener
 * @description Interface defining the required method for event listeners. This interface ensures that all event
 * listeners implement a standard method for handling events, promoting consistency and ease of use in the event
 * handling system.
 *
 * Type Parameters:
 * - T: A generic type parameter that extends the Event interface. This allows the EventListener to handle specific
 *   types of events, providing type safety and flexibility.
 *
 * Methods:
 * - handle: The function to be called when the event is dispatched. This method takes an event object of type T as
 *   its parameter and performs the necessary actions to handle the event.
 */
export interface EventListener<T extends Event> {
 /**
  * @method handle
  * @description The function to be called when the event is dispatched. This method is responsible for performing
  * the necessary actions to handle the event. It takes an event object of type T as its parameter, allowing the
  * event listener to process the specific event being dispatched.
  *
  * @param {T} event - The event object that has been dispatched. This object contains all the necessary information
  * about the event, allowing the event listener to take appropriate action.
  */
 handle(event: T): void;
}
