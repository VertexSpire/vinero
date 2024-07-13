// src/types/user-strategy-field.type.ts

import { User } from '../interfaces/user.interface';

/**
 * @type UserStrategyField
 * @description Type representing fields in the User interface that can be used as strategies.
 * This type is a union of the keys in the User interface, allowing for type-safe references to
 * specific fields of the User object. It is useful for defining strategy-based operations on
 * User objects where specific fields are involved.
 *
 * The keyof operator in TypeScript creates a union type consisting of the property names of the
 * User interface. This ensures that only valid User field names can be assigned to variables of
 * type UserStrategyField, providing compile-time safety and reducing the likelihood of errors.
 *
 * Example Usage:
 * ```
 * let strategyField: UserStrategyField;
 * strategyField = 'username'; // Valid
 * strategyField = 'password'; // Valid
 * strategyField = 'nonExistentField'; // Error: Type '"nonExistentField"' is not assignable to type 'UserStrategyField'.
 * ```
 */
export type UserStrategyField = keyof User;
