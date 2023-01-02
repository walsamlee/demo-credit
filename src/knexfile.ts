import path from 'path';

const client = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'democredit',
      password: 'computer123',
      database: 'democredit',
      port: '3306'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, '/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/seeds')
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: '',
      password: '',
      database: 'my_db'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, '/migrations')
    }
  }
}

export default client;
