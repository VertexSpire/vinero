// src/config/logger.config.ts

/**
 * @constant loggerConfig
 * @description Configuration object for logger settings. This object includes settings for enabling logging,
 * and specifying details for console, file, HTTP, and MongoDB transports.
 */
export const loggerConfig = {
  /**
   * @property {boolean} enable - Flag to enable or disable logging.
   */
  enable: process.env.ENABLE_LOGGING === 'true',

  /**
   * @property {object} console - Configuration for console logging.
   */
  console: {
    /**
     * @property {boolean} enable - Flag to enable or disable console logging.
     */
    enable: process.env.ENABLE_CONSOLE_LOGGING === 'true',
  },

  /**
   * @property {object} file - Configuration for file logging.
   */
  file: {
    /**
     * @property {boolean} enable - Flag to enable or disable file logging.
     */
    enable: process.env.ENABLE_FILE_LOGGING === 'true',
  },

  /**
   * @property {object} http - Configuration for HTTP logging.
   */
  http: {
    /**
     * @property {boolean} enable - Flag to enable or disable HTTP logging.
     */
    enable: process.env.ENABLE_HTTP_LOGGING === 'true',

    /**
     * @property {string} endpoint - The endpoint for HTTP logging.
     */
    endpoint: process.env.HTTP_LOGGING_ENDPOINT || '',
  },

  /**
   * @property {object} mongo - Configuration for MongoDB logging.
   */
  mongo: {
    /**
     * @property {boolean} enable - Flag to enable or disable MongoDB logging.
     */
    enable: process.env.ENABLE_MONGO_LOGGING === 'true',

    /**
     * @property {string} uri - The MongoDB URI.
     */
    uri: process.env.MONGO_LOGGING_URI || '',

    /**
     * @property {string} collection - The MongoDB collection name.
     */
    collection: process.env.MONGO_LOGGING_COLLECTION || '',
  },
};
