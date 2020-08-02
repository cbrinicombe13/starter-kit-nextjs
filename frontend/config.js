import getConfig from 'next/config';
const { publicRuntimeConfig } = require('./next.config');

export const API = publicRuntimeConfig.PRODUCTION ? 'https://blog.com' : publicRuntimeConfig.API_DEVELOPMENT;
export const APP_NAME = publicRuntimeConfig.APP_NAME;