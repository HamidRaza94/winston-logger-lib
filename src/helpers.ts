import { existsSync, mkdirSync } from 'fs';
import { format } from 'winston';

export const isRequest = format((info, opts) => {
	if (info.isRequest) {
		return info;
	}

	return false;
});

// Create the log directory if it does not exist
export const mkDir = (dir: string) => {
	if (!existsSync(dir)) {
		mkdirSync(dir);
	}
};
