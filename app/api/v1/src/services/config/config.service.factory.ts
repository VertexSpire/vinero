// src/services/config/config.service.factory.ts

/**
 * @class ConfigServiceFactory
 * @description Factory class for creating instances of the ConfigService. This factory provides methods to
 * instantiate new ConfigService objects, manage a singleton instance, and flatten configuration objects.
 */
export class ConfigServiceFactory {
 /**
  * @property {ConfigService} instance - The singleton instance of ConfigService. This property ensures that only one
  * instance of ConfigService is created and shared throughout the application.
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
  */
 public static getConfigService(flatConfig: Record<string, any>): ConfigService {
  if (!ConfigServiceFactory.instance) {
   ConfigServiceFactory.instance = new ConfigService(flatConfig);
  }
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
  */
 public static flattenConfig(config: Record<string, any>): Record<string, any> {
  /**
   * @constant {Record<string, any>} flatConfig - The flattened configuration object. This object will store the flattened
   * key-value pairs from the original nested configuration object.
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
   */
  function flatten(obj: Record<string, any>, prefix = ''): void {
   for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
     const propName = prefix ? `${prefix}.${key}` : key;

     if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flatten(obj[key], propName);
     } else {
      flatConfig[propName] = obj[key];
     }
    }
   }
  }

  flatten(config);

  return flatConfig;
 }
}
