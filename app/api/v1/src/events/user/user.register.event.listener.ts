import { EventListener, UserRegisteredEvent } from '../';

/**
 * Listener for the UserRegisteredEvent.
 */
export class UserRegisteredListener implements EventListener<UserRegisteredEvent> {
  /**
   * Handles the UserRegisteredEvent by logging a message.
   * @param event - The UserRegisteredEvent object.
   */
  public handle(event: UserRegisteredEvent): void {
    console.log(`User ${event.user.name} has registered!`);
  }
}
