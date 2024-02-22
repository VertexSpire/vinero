// src/services/config/config.service.factory.ts

/**
 * Factory for creating ConfigService instances.
 */
export class ConfigServiceFactory {
    private static instance: ConfigService;
  
    /**
     * Get an instance of ConfigService.
     * @returns An instance of ConfigService.
     */
    public static getConfigService(flatConfig: Record<string, any>): ConfigService {
      if (!ConfigServiceFactory.instance) {
        ConfigServiceFactory.instance = new ConfigService(flatConfig);
      }
      return ConfigServiceFactory.instance;
    }
  
    /**
     * Flatten a configuration object.
     * @param config - The configuration object.
     * @returns The flattened configuration object.
     */
    public static flattenConfig(config: Record<string, any>): Record<string, any> {
      const flatConfig: Record<string, any> = {};
  
      function flatten(obj: Record<string, any>, prefix = '') {
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
  