import { Config } from './types';

let config: Config = {};

const assignConfig = (c: Config) => {
	config = c;
};

export default config;
export { assignConfig };
