import dotenv from 'dotenv';
dotenv.config();

export const ENV_CONFIG = {
    APP_NAME: process.env.APP_NAME,
    APP_ENVIRONMENT: process.env.APP_ENVIRONMENT || 'development',
    PORT: process.env.PORT,
} as const;