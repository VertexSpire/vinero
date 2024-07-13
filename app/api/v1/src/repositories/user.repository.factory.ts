// src/factories/user.repository.factory.ts

import { UserRepository } from '../repositories/user.repository';

/**
 * @class UserRepositoryFactory
 * @description Factory class for creating instances of the UserRepository. This factory provides a method to
 * instantiate new UserRepository objects, encapsulating the creation logic and promoting consistency and
 * ease of maintenance.
 */
export class UserRepositoryFactory {
 /**
  * @method createUserRepository
  * @description Creates and returns a new instance of the UserRepository. This method abstracts the instantiation
  * process, allowing for easy creation of UserRepository objects without needing to directly call the constructor.
  *
  * @returns {UserRepository} - A new instance of UserRepository. This instance can be used to interact with
  * the users collection in the database, performing CRUD operations and queries.
  */
 public static createUserRepository(): UserRepository {
  return new UserRepository();
 }
}
