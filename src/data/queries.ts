import { IUserData } from 'src/common/seedData';
import knex from './knex';

export const getAllUsers = async () => {
  let result = await knex('users').select('*');

  return result;
}

export const createUser = async (payload: IUserData) => {
  const result = await knex('users').insert([payload])

  return result;
}
