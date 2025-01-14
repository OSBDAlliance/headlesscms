import { Request, Response, NextFunction } from 'express';
import morgan, { StreamOptions } from 'morgan';
import logger from '../utils/logger';
import { ENV_CONFIG } from '../../config/environment';

// Stream to forward logs to Pino
const morganStream: StreamOptions = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Custom token to differentiate log levels based on status code
morgan.token('level', (req: Request, res: Response) => {
  const status = res.statusCode;
  return status >= 500
    ? 'error'
    : status >= 400
    ? 'warn'
    : status >= 300
    ? 'info'
    : 'debug';
});

// Request logger function for development environment
const requestLogger = ENV_CONFIG.APP_ENVIRONMENT === 'development'
? morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream: morganStream }
  )
: (req: Request, res: Response, next: NextFunction): void => {
    next(); // ignoring logs in production
  };
  
export default requestLogger;
