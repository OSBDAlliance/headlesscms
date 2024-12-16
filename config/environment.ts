import dotenv from 'dotenv';
dotenv.config();

export const ENV_CONFIG = {
    APP_NAME: process.env.APP_NAME,
    APP_ENVIRONMENT: process.env.APP_ENVIRONMENT || 'development',
    PORT: process.env.PORT,
} as const;

export const PORT = process.env.PORT || 3306;
export const DB_HOST = process.env.DB_HOST || '192.254.186.198';
export const DB_USER = process.env.DB_USER || 'firozem_osbdcms';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'osbdcms@1234';
export const DB_NAME = process.env.DB_NAME || 'firozem_headlesscms';