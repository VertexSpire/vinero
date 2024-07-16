/**
 * @class ConfigServiceFactory
 * @description Factory class for creating instances of the ConfigService. This factory provides methods to
 * instantiate new ConfigService objects, manage a singleton instance, and flatten configuration objects.
 *
 * The ConfigServiceFactory class is responsible for managing the creation and provision of ConfigService instances.
 * It ensures that only one instance of ConfigService is created (singleton pattern) and offers functionality to
 * flatten nested configuration objects into a simpler key-value pair structure.
 *
 * This factory class is designed to facilitate configuration management in an application, making it easier to
 * handle complex configuration data and ensuring a consistent approach to configuration service instantiation.
 *
 * @see ConfigService
 * @see ConfigServiceInterface
 * @see flattenConfig
 *
 * @example
 * const config = { app: { name: 'MyApp', version: '1.0' }, db: { host: 'localhost' } };
 * const flatConfig = ConfigServiceFactory.flattenConfig(config);
 * const configService = ConfigServiceFactory.getConfigService(flatConfig);
 * console.log(configService.get('app.name')); // Outputs: 'MyApp'
 *
 * @author Wasif Farooq
 */
export class ConfigServiceFactory {
 /**
  * @property {ConfigService} instance
  * @private
  * @description The singleton instance of ConfigService. This property ensures that only one
  * instance of ConfigService is created and shared throughout the application.
  *
  * The `instance` property is a static member of the ConfigServiceFactory class. It holds the singleton instance of
  * ConfigService, ensuring that all parts of the application use the same instance. This design pattern helps in
  * maintaining a single source of configuration truth and avoids the overhead of multiple ConfigService instances.
  */
 private static instance: ConfigService;

 /**
  * @method getConfigService
  * @description Get an instance of ConfigService. This method returns the singleton instance of ConfigService. If the
  * instance does not already exist, it creates a new one using the provided flatConfig.
  *
  * @param {Record<string, any>} flatConfig - The flattened configuration object. This parameter provides the configuration
  * data to initialize the ConfigService instance.
  * @returns {ConfigService} - An instance of ConfigService. This instance is either newly created or the existing one if it
  * was previously created.
  *
  * The `getConfigService` method ensures that only one instance of ConfigService exists at any given time. If an instance
  * already exists, it returns that instance; otherwise, it creates a new instance using the provided flattened configuration.
  * This method centralizes the creation and provision of ConfigService instances, ensuring consistency and reducing redundancy.
  */
 public static getConfigService(flatConfig: Record<string, any>): ConfigService {
  if (!ConfigServiceFactory.instance) {
   /**
    * Check if an instance of ConfigService does not already exist.
    * If not, create a new instance using the provided flattened configuration object (flatConfig).
    * This step initializes the singleton instance with the necessary configuration data.
    */
   ConfigServiceFactory.instance = new ConfigService(flatConfig);
  }
  /**
   * Return the existing or newly created instance of ConfigService.
   * This ensures that all parts of the application use the same instance, maintaining a consistent configuration state.
   */
  return ConfigServiceFactory.instance;
 }

 /**
  * @method flattenConfig
  * @description Flatten a configuration object. This method takes a nested configuration object and returns a flat
  * object where each key represents the path to a value in the original object.
  *
  * @param {Record<string, any>} config - The configuration object. This parameter provides the nested configuration data
  * to be flattened.
  * @returns {Record<string, any>} - The flattened configuration object. This object contains key-value pairs where each key
  * is a path to a value in the original nested object.
  *
  * The `flattenConfig` method simplifies a nested configuration object into a flat key-value pair structure. This makes
  * it easier to access deeply nested configuration values using simple dot-separated keys. The method uses a recursive
  * helper function to traverse the nested object and build the flattened structure.
  */
 public static flattenConfig(config: Record<string, any>): Record<string, any> {
  /**
   * @constant {Record<string, any>} flatConfig - The flattened configuration object. This object will store the flattened
   * key-value pairs from the original nested configuration object.
   *
   * The `flatConfig` constant is initialized as an empty object. It will be populated with flattened key-value pairs
   * as the nested configuration object is traversed. Each key in `flatConfig` represents a unique path to a value
   * in the original configuration object.
   */
  const flatConfig: Record<string, any> = {};

  /**
   * @function flatten
   * @description Recursive helper function to flatten the configuration object. This function iterates over the properties
   * of the nested object and adds flattened key-value pairs to the flatConfig object.
   *
   * @param {Record<string, any>} obj - The nested configuration object. This parameter provides the current level of the
   * configuration data to be flattened.
   * @param {string} [prefix=''] - The prefix for the flattened keys. This parameter provides the path prefix for the current
   * level of the configuration data.
   *
   * The `flatten` function is a recursive helper function designed to traverse the nested configuration object.
   * It constructs flattened keys by appending the current property name to the prefix and stores the corresponding values
   * in the `flatConfig` object. If a property value is an object (and not an array), the function calls itself recursively
   * to process the nested object.
   */
  function flatten(obj: Record<string, any>, prefix = ''): void {
   for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
     const propName = prefix ? `${prefix}.${key}` : key;

     if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      /**
       * If the property value is an object (and not an array), call the flatten function recursively.
       * This continues the flattening process for nested objects, using the current property name as a prefix.
       */
      flatten(obj[key], propName);
     } else {
      /**
       * If the property value is not an object, add the flattened key-value pair to the flatConfig object.
       * This ensures that all nested properties are included in the flattened structure with appropriate keys.
       */
      flatConfig[propName] = obj[key];
     }
    }
   }
  }

  /**
   * Call the flatten function with the initial configuration object to start the flattening process.
   * This populates the flatConfig object with flattened key-value pairs from the nested configuration object.
   */
  flatten(config);

  /**
   * Return the flattened configuration object, which contains key-value pairs representing paths to values in the original object.
   * This provides a simplified, easy-to-access structure for configuration properties.
   */
  return flatConfig;
 }
}
