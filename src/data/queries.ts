import knex from './knex';


export const getAllUsers = async () => {
  let result = await knex('users').select('*');

  return result;
}

// export default getAllUsers;
