import { ENV_CONFIG } from '../../config/environment';
import logger from './logger';


// Override console.log
console.log = (...args: unknown[]) => {
  if (ENV_CONFIG.APP_ENVIRONMENT === 'development') {
    logger.info(args.map(String).join(' '));
  }
};
