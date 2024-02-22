// src/repositories/permission.repository.ts
import { PermissionModel } from '../models/permission.model';
import { Permission } from '../common/interfaces/permission.interface';

/**
 * Repository for permission-related database operations.
 */
export class PermissionRepository {
  public async findPermissionByName(name: string): Promise<Permission | null> {
    return PermissionModel.findOne({ name }).exec();
  }

  public async createPermission(permissionData: Permission): Promise<Permission> {
    return PermissionModel.create(permissionData);
  }
}
