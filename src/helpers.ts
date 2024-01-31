import { TransformableInfo } from 'logform';

import config from './config';
import { APP_ENVIRONMENTS } from './constants';

export const isObject = (variable: any): boolean =>
	typeof variable === 'object' && !Array.isArray(variable) && variable !== null;

export const isNull = (variable: any): boolean => typeof variable === 'object' && variable === null;

export const isUndefined = (variable: any): boolean => typeof variable === 'undefined';

export const isArray = (variable: any): boolean => Array.isArray(variable);

export const isFunction = (variable: any): boolean => typeof variable === 'function';

export const isNumber = (variable: any): boolean => typeof variable === 'number';

export const stringify = (obj: any): string => {
	if (isObject(obj)) {
		return Object.keys(obj).length ? JSON.stringify(obj) : '';
	}

	if (isArray(obj) || isNumber(obj)) {
		return JSON.stringify(obj);
	}

	if (isFunction(obj)) {
		return obj.toString();
	}

	if (isNull(obj) || isUndefined(obj)) {
		return '';
	}

	return obj;
};

export const printFormatter = (info: TransformableInfo): string => {
	let printMessage = `${info.timestamp} ${info.level}: ${stringify(info.message)}`;
	const metadata = stringify(info.metadata);

	if (metadata) {
		return `${printMessage}: ${metadata}`;
	}

	return printMessage;
};

export const isNonProd = (): boolean => config.NODE_ENV !== APP_ENVIRONMENTS.production;
