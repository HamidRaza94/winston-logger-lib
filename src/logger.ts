import { createLogger, transports, format } from 'winston';

import config from './config';
import { APP_ENVIRONMENTS } from './constants';
import { printFormatter } from './helpers';

// -- levels --
// error
// warn
// info
// http
// verbose
// debug
// silly

const logger = createLogger({
	format: format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	transports: [
		new transports.Console({
			level: config.NODE_ENV !== APP_ENVIRONMENTS.production ? 'debug' : 'info',
			handleExceptions: true,
			format: format.combine(
				format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
				format.colorize(),
				format.printf(printFormatter)
			),
		}),
		new transports.Http({
			level: 'error',
			host: config.LOGGER_HOST,
			port: config.LOGGER_PORT,
			path: config.LOGGER_PATH,
			format: format(({ level, ...restInfo }) => ({ ...restInfo, type: level.toUpperCase() } as any))(),
		}),
	],
	exitOnError: false,
});

export default logger;
