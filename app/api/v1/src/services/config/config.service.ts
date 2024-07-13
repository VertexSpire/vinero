// src/services/config/config.service.ts

import { ConfigService as ConfigServiceInterface } from '../common/interfaces/config.interface';

/**
 * @class ConfigService
 * @implements ConfigServiceInterface
 * @description Service for managing configuration settings. This service provides methods to access
 * configuration properties from a flattened configuration object.
 */
export class ConfigService implements ConfigServiceInterface {
 /**
  * @property {Record<string, any>} flatConfig - The flattened configuration object. This object stores configuration
  * properties in a flattened key-value pair format, where each key represents the path to a value in the original configuration object.
  */
 private flatConfig: Record<string, any>;

 /**
  * @constructor
  * @description Constructor for the ConfigService class. It initializes the service with a flattened configuration object.
  *
  * @param {Record<string, any>} flatConfig - The flattened configuration object. This parameter provides the configuration
  * data to initialize the ConfigService instance.
  */
 constructor(flatConfig: Record<string, any>) {
  this.flatConfig = flatConfig;
 }

 /**
  * @method get
  * @description Get the value of a configuration property. This method retrieves the value of a configuration property
  * using the provided path.
  *
  * @param {string} path - The path to the configuration property. This parameter specifies the key of the configuration
  * property in the flattened configuration object.
  * @returns {T | undefined} - The value of the configuration property. If the property is not found, undefined is returned.
  * @template T - The type of the configuration property value.
  */
 get<T>(path: string): T | undefined {
  return this.flatConfig[path];
 }
}
