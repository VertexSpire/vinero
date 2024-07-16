import { ConfigService as ConfigServiceInterface } from '../common/interfaces/config.interface';

/**
 * @class ConfigService
 * @implements ConfigServiceInterface
 * @description Service for managing configuration settings. This service provides methods to access
 * configuration properties from a flattened configuration object.
 *
 * This class is responsible for handling configuration settings within an application. It implements
 * the ConfigServiceInterface to ensure consistency and adherence to a standard interface for configuration services.
 * The primary purpose of this class is to provide a convenient way to access configuration values using a flattened
 * key-value pair structure, where each key represents a unique path to a configuration value.
 *
 * @author Wasif Farooq
 */
export class ConfigService implements ConfigServiceInterface {
 /**
  * @property {Record<string, any>} flatConfig
  * @private
  * @description The flattened configuration object. This object stores configuration
  * properties in a flattened key-value pair format, where each key represents the path to a value in the original configuration object.
  *
  * The `flatConfig` property is a private member of the ConfigService class. It is initialized through the constructor
  * and is used internally to store and retrieve configuration values. This design ensures that the configuration settings
  * are encapsulated and managed within the service, providing a single source of truth for configuration data.
  */
 private flatConfig: Record<string, any>;

 /**
  * @constructor
  * @description Constructor for the ConfigService class. It initializes the service with a flattened configuration object.
  *
  * @param {Record<string, any>} flatConfig - The flattened configuration object. This parameter provides the configuration
  * data to initialize the ConfigService instance.
  *
  * The constructor is responsible for setting up the ConfigService instance with the provided flattened configuration.
  * By accepting a flattened configuration object as a parameter, it allows the service to be flexible and adaptable to
  * various configuration sources and formats. The constructor ensures that the `flatConfig` property is populated with
  * the provided configuration data, ready for use by the service's methods.
  */
 constructor(flatConfig: Record<string, any>) {
  /**
   * Initialize the flatConfig property with the provided flattened configuration object.
   * This involves setting the class's private flatConfig property to the passed flatConfig parameter.
   * The constructor uses this parameter to provide the necessary configuration data
   * to the ConfigService instance, ensuring that it has access to the required settings.
   */
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
  *
  * The `get` method provides a way to access configuration values by specifying a path. It looks up the provided path
  * in the `flatConfig` object and returns the corresponding value. If the specified path does not exist in the configuration,
  * the method returns `undefined`. This approach allows for safe and controlled access to configuration properties, ensuring
  * that the caller handles the possibility of missing configuration values appropriately.
  */
 get<T>(path: string): T | undefined {
  /**
   * Retrieve the value from the flatConfig object using the provided path.
   * This involves accessing the flatConfig property of the instance and using the path parameter
   * to find the corresponding value in the flattened configuration object.
   * If the path does not exist in the flatConfig, the method will return undefined, indicating
   * that the requested configuration property was not found.
   */
  return this.flatConfig[path];
 }
}
