export default {
    /**
     * @type {number}
     * @default 3010
     */
    port: process.env.PORT || 3010,
    /**
     * Values:
     * DEVELOPMENT
     * PRODUCTION
     * @type {string="DEVELOPMENT", "PRODUCTION"}
     * @default DEVELOPMENT
     */
    env: process.env.ENV || 'DEVELOPMENT',
    logger: {
      /**
       * Supported values:
       * debug
       * info
       * warn
       * error
       * @type {string="debug", "info", "warn", "error"}
       */
      level: process.env.LOGGER_LEVEL,
    },
    /**
     * @type {string}
     */
    accessKey: process.env.ACCESS_KEY,
    /**
     * JSON value.
     * 
     * Example:
     * [{
     *    id: '9c98535a-b3af-4a00-a364-12a9f00d2e8e',
     *    group: 'General',
     *    name: 'Blog',
     *    description: '',
     *    url: 'https://juffalow.com',
     *    version: 'unknown',
     * }]
     * 
     * @type {string}
     */
    projects: process.env.PROJECTS ? JSON.parse(process.env.PROJECTS) : [],
  }
  