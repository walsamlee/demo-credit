import Joi from 'joi';

import { INewUser } from 'src/data/interfaces/iNewUser';

export const validateUser = (user: INewUser) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    phone_number: Joi.string().required(),
    password: Joi.string().required()
  })

  return schema.validate(user)
}