import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: '',
      password: '',
      database: 'my_db'
    }
  }
}
