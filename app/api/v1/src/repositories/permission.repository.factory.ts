// src/factories/permission.repository.factory.ts
import { PermissionRepository } from '../repositories/permission.repository';

/**
 * Factory for creating PermissionRepository instances.
 */
export class PermissionRepositoryFactory {
  /**
   * Create a PermissionRepository instance.
   * @returns A new PermissionRepository instance.
   */
  public static createPermissionRepository(): PermissionRepository {
    return new PermissionRepository();
  }
}
