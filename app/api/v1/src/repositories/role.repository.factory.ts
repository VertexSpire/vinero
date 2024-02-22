// src/factories/role.repository.factory.ts
import { RoleRepository } from '../repositories/role.repository';

/**
 * Factory for creating RoleRepository instances.
 */
export class RoleRepositoryFactory {
  /**
   * Create a RoleRepository instance.
   * @returns A new RoleRepository instance.
   */
  public static createRoleRepository(): RoleRepository {
    return new RoleRepository();
  }
}
