// src/repositories/role.repository.ts
import { RoleModel } from '../models/role.model';
import { Role } from '../common/interfaces/role.interface';

/**
 * Repository for role-related database operations.
 */
export class RoleRepository {
  public async findRoleByName(name: string): Promise<Role | null> {
    return RoleModel.findOne({ name }).exec();
  }

  public async createRole(roleData: Role): Promise<Role> {
    return RoleModel.create(roleData);
  }
}
