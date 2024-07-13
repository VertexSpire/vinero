// src/events/user-registered.event.ts

import { Event } from '../common/interfaces';

/**
 * @class UserRegisteredEvent
 * @implements Event
 * @description Event representing a user registration. This class implements the Event interface, providing a specific
 * event type for when a user registers. It contains the registered user's data and a predefined event name.
 */
export class UserRegisteredEvent implements Event {
  /**
   * @property {string} name - The name of the event. This property is set to a constant value 'user.registered' to identify
   * the type of event being dispatched. It is a read-only property that implements the name property of the Event interface.
   */
  public readonly name: string = 'user.registered'; // Event name

  /**
   * @property {any} user - The registered user data. This property contains the information about the user who has registered.
   * It is a read-only property that is set through the constructor.
   */
  public readonly user: any;

  /**
   * @constructor
   * @description Constructor for the UserRegisteredEvent class. It initializes the event with the registered user's data.
   * The user data is passed as an argument and assigned to the user property.
   *
   * @param {any} user - The registered user data. This parameter contains all the relevant information about the user
   * who has registered, and it is used to initialize the user property of the event object.
   */
  constructor(user: any) {
    this.user = user;
  }
}
