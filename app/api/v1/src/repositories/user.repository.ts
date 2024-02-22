// src/repositories/user.repository.ts
import { UserModel } from '../models/user.model';
import { User } from '../common/interfaces/user.interface';

/**
 * Repository for user-related database operations.
 */
export class UserRepository {
  public async findUserByUsername(username: string): Promise<User | null> {
    return UserModel.findOne({ username }).exec();
  }

  public async createUser(userData: User): Promise<User> {
    return UserModel.create(userData);
  }
}
