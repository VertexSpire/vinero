// src/services/user/user.service.factory.ts
import { UserService } from './user.service';
import { UserRepositoryFactory } from '../../repositories/user.repository.factory';

/**
 * Factory for creating UserService instances.
 */
export class UserServiceFactory {
  /**
   * Create a new instance of UserService.
   * @returns An instance of UserService.
   */
  public static createUserService(): UserService {
    const userRepository = UserRepositoryFactory.createUserRepository();
    return new UserService(userRepository);
  }
}
