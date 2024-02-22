// src/services/config/config.service.ts

import { ConfigService as ConfigServiceInterface } from '../common/interfaces/config.interface';

/**
 * Service for managing configuration settings.
 */
export class ConfigService implements ConfigServiceInterface {
  private flatConfig: Record<string, any>;

  /**
   * Constructor for the ConfigService class.
   * @param flatConfig - The flattened configuration object.
   */
  constructor(flatConfig: Record<string, any>) {
    this.flatConfig = flatConfig;
  }

  /**
   * Get the value of a configuration property.
   * @param path - The path to the configuration property.
   * @returns The value of the configuration property.
   */
  get<T>(path: string): T | undefined {
    return this.flatConfig[path];
  }
}
