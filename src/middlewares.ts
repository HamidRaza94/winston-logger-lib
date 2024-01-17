import { join } from 'path';
import winston, { format, transports } from 'winston';

import { assignConfig } from './config';
import { mkDir } from './helpers';
import { Config, ConfigReq } from './types';

const buildWinstonConfig = (c: ConfigReq) => {
	let config: Config = {
		level: 'info',
		format: format.combine(
			format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
			// format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })
		),
	};

	let configTransports: winston.LoggerOptions['transports'] = [];
	let exceptionHandlers: winston.LoggerOptions['exceptionHandlers'] = [];

	for (const [key, value] of Object.entries(c.transports)) {
		let newTransport: winston.LoggerOptions['transports'] | winston.LoggerOptions['exceptionHandlers'] = [];

		if (value?.network) {
			newTransport.push(new transports.Http(value.network));
		}

		if (value?.file) {
			mkDir(value.file.dir);
			const filename = join(value.file.dir, value.file.filename);

			newTransport.push(new transports.File({ filename }));
		}

		if (value?.console) {
			newTransport.push(new transports.Console());
		}

		if (key === 'exception') {
			exceptionHandlers = [...exceptionHandlers, ...newTransport];
			continue;
		}

		configTransports = [...configTransports, ...newTransport];
	}

	console.log('configTransports =>', configTransports);

	if (configTransports.length) {
		config.transports = configTransports;
	}

	assignConfig(config);
};

export const useLogger = (c: ConfigReq) => () => {
	buildWinstonConfig(c);
};
