import { createLogger, transports, format } from 'winston';

import config from './config';
import { APP_ENVIRONMENTS, LOG_LEVELS } from './constants';
import { printFormatter } from './helpers';

const logger = createLogger({
	format: format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	transports: [
		new transports.Console({
			level: config.NODE_ENV !== APP_ENVIRONMENTS.production ? LOG_LEVELS.debug : LOG_LEVELS.info,
			handleExceptions: true,
			format: format.combine(
				format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
				format.colorize(),
				format.printf(printFormatter)
			),
		}),
		new transports.Http({
			level: LOG_LEVELS.error,
			host: config.LOGGER_HOST,
			port: config.LOGGER_PORT,
			path: config.LOGGER_PATH,
			format: format(({ level, ...restInfo }) => ({ ...restInfo, type: level.toUpperCase() } as any))(),
		}),
	],
	exitOnError: false,
});

export default logger;
