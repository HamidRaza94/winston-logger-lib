import { createLogger } from 'winston';

import config from './config';

const logger = createLogger(config);

export default logger;
