import winston from 'winston';

export type Config = winston.LoggerOptions;

export type Transport = {
	network?: winston.transports.HttpTransportOptions;
	file?: {
		dir: string;
		filename: string;
	};
	console?: boolean;
};

export type ConfigReq = {
	transports: {
		info?: Transport;
		debug?: Transport;
		error?: Transport;
		request?: Transport;
		exception?: Transport;
	};
};
