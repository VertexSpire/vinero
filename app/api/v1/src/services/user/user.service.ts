// src/services/user/user.service.ts
import { UserRepository } from '../../repositories/user.repository';

/**
 * Service for managing user-related operations.
 */
export class UserService {
  private readonly userRepository: UserRepository;

  /**
   * Constructor for the UserService class.
   * @param userRepository - The UserRepository instance.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Get a user by their ID.
   * @param userId - The ID of the user to retrieve.
   * @returns A Promise that resolves to the user or null if not found.
   */
  public async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.getUserById(userId);
  }
}
