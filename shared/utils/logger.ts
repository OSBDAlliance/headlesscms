import pino from 'pino';

// Pino logger instance
const logger = pino({
level: 'info',
transport: {
    target: 'pino-pretty', 
    options: {
    colorize: true, 
    singleLine: true,
    ignore: 'pid,hostname',
    },
},
base: undefined,
});
export default logger;