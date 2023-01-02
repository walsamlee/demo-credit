import knex from 'knex';

import config from '../knexfile';

const environment = process.env.NODE_ENV || 'development';

const connectionConfig = config[environment];

console.log('connection: ', connectionConfig)

const connection = knex(connectionConfig);

export default connection;