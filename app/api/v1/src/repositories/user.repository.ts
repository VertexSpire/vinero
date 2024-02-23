// src/repositories/user.repository.ts
import { UserModel } from '../models/user.model';
import { User, UserStrategyField } from '../common/interfaces/user.interface';

/**
 * Repository for user-related database operations.
 */
export class UserRepository {
  /**
   * Find a user by a specific strategy field and value.
   * @param strategyField - The field to search for (e.g., 'id', 'username', 'email').
   * @param strategyId - The value of the specified field.
   * @returns A Promise that resolves to the user or null if not found.
   */
  public async findByStrategy(strategyField: UserStrategyField, strategyId: string): Promise<User | null> {
    const query: any = {};
    query[strategyField] = strategyId;
    return UserModel.findOne(query).exec();
  }

  /**
   * Find a user by their username.
   * @param username - The username to search for.
   * @returns A Promise that resolves to the user or null if not found.
   */
  public async findUserByUsername(username: string): Promise<User | null> {
    return UserModel.findOne({ username }).exec();
  }

  /**
   * Create a new user in the database.
   * @param user - The user data to create.
   * @returns A Promise that resolves to the created user.
   */
  public async createUser(user: User): Promise<User> {
    return UserModel.create(user);
  }

  /**
   * Find a user by email.
   * @param email - The email to search for.
   * @returns A Promise that resolves to the user or null if not found.
   */
  public async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).exec();
  }
}
