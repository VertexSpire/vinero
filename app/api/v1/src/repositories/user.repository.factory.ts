// src/factories/user.repository.factory.ts
import { UserRepository } from '../repositories/user.repository';

/**
 * Factory for creating UserRepository instances.
 */
export class UserRepositoryFactory {
  /**
   * Create a UserRepository instance.
   * @returns A new UserRepository instance.
   */
  public static createUserRepository(): UserRepository {
    return new UserRepository();
  }
}
