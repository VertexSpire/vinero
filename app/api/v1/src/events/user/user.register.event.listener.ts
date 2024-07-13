// src/events/listeners/user-registered.listener.ts

import { EventListener, UserRegisteredEvent } from '../';

/**
 * @class UserRegisteredListener
 * @implements EventListener
 * @description Listener for the UserRegisteredEvent. This class implements the EventListener interface for the
 * UserRegisteredEvent, providing a specific handler method to process the event when it is dispatched. The listener
 * is responsible for defining the actions to be taken when a user registers.
 */
export class UserRegisteredListener implements EventListener<UserRegisteredEvent> {
 /**
  * @method handle
  * @description Handles the UserRegisteredEvent by logging a message. This method is called when the UserRegisteredEvent
  * is dispatched, and it receives the event object as its parameter. The handle method processes the event by performing
  * the desired actions, such as logging information or triggering additional processes.
  *
  * @param {UserRegisteredEvent} event - The UserRegisteredEvent object. This object contains the details of the registered user
  * and any other relevant information associated with the event. The event object is passed to the handle method, allowing it
  * to access and use the event data.
  */
 public handle(event: UserRegisteredEvent): void {
  console.log(`User ${event.user.name} has registered!`);
 }
}
