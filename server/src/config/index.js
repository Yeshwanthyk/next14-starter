import { merge } from 'lodash';

const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  isDev: env === 'development',
  isStaging: env === 'staging',
  isProd: env === 'production',
  port: 3333,
};

let envConfig = {};

switch (env) {
  case 'development':
    envConfig = require('./dev').config;
    break;
  case 'staging':
    envConfig = require('./staging').config;
    break;
  case 'production':
    envConfig = require('./prod').config;
    break;
  default:
    envConfig = require('./dev').config;
}

export default merge(baseConfig, envConfig);
