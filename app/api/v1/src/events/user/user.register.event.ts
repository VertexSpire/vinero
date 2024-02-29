import { Event } from '../common/interfaces';

/**
 * Event representing a user registration.
 */
export class UserRegisteredEvent implements Event {
  public readonly name: string = 'user.registered'; // Event name
  public readonly user: any;

  /**
   * Constructor for the UserRegisteredEvent class.
   * @param user - The registered user data.
   */
  constructor(user: any) {
    this.user = user;
  }
}
