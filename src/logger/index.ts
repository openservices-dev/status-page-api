import winston, { format } from 'winston';
import config from '../config';

/**
 * 
 * @see https://github.com/winstonjs/winston
 * @see https://www.npmjs.com/package/winston
 */
const logger = winston.createLogger({
  level: config.logger.level.toLowerCase(),
  transports: [
    new winston.transports.Console({
      level: config.logger.level.toLowerCase(),
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
        winston.format.errors({ stack: true }),
      ),
    }),
  ],
});

export default logger;
