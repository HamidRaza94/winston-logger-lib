import { APP_ENVIRONMENTS } from './constants';

const config = Object.freeze({
	NODE_ENV: process.env.NODE_ENV || APP_ENVIRONMENTS.development,

	LOGGER_HOST: process.env.LOGGER_HOST || 'localhost',
	LOGGER_PORT: Number(process.env.LOGGER_PORT || 8000),
	LOGGER_PATH: process.env.LOGGER_PATH || '/api/logs',
});

export default config;
