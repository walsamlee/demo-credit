import { Request, Response } from 'express';

import { createUser, getAllUsers } from '../data/queries';
import { Success, Failure } from '../common/apiResponse'
import { validateUser } from '../validations/validate';
import { IUserData } from '../common/seedData';
import { hash } from '../helpers/passwordHash';

const user = {
  allUsers: async (req: Request, res: Response) => {
   try {
    let result = await getAllUsers();

    const response: Success = {
      status: true,
      code: '00',
      message: 'Users retrieved successfully!',
      data: result
    }

    return res.status(200).json({
      response
    });
   } catch (error) {
    const response: Failure = {
      status: false,
      code: '-98',
      error: 'Error connecting to db'
    }

    return res.status(400).json({
      response
    })
   }
  },
  createUser: async (req: Request, res: Response) => {
    if (req.body === null) {
      const response: Failure = {
        status: false,
        code: '-99',
        error: 'Empty payload'
      }

      return res.status(400).json({
        response
      });
    }

    try {
      const { error, value } = validateUser(req.body);

      if (error) {
        const missingField = error['details'][0]['context']['label']

        const response: Failure = {
          status: false,
          code: '-99',
          error: 'Invalid payload! ' + missingField + ' is required.',
          data: value
        }

        return res.status(400).json({
          response
        });
      }

      const {
        username,
        password,
        email,
        phone_number,
        first_name,
        last_name
      } = req.body;

      const hashedPassword = await hash(password);

      const payload: IUserData = {
        username,
        password: hashedPassword === null ? '' : hashedPassword,
        email,
        first_name,
        last_name,
        phone_number,
        verification_status: 1,
        date_created: new Date(),
        date_updated: new Date()
      }

      const result = await createUser(payload);

      if (result.length > 0) {
        const response: Success = {
          status: true,
          code: '00',
          message: 'User created successfully!',
          data: null
        }
  
        return res.status(201).json({
          response
        });
      }

      const response: Failure = {
        status: false,
        code: '-99',
        error: 'Unable to create user!'
      }

      return res.status(400).json({
        response
      });
    } catch (error) {
      const response: Failure = {
        status: false,
        code: '-99',
        error: 'Bad request. ' + error
      }

      return res.status(400).json({
        response
      });
    }
  }
}

export default user;