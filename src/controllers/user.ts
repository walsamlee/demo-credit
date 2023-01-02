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

    const responseJson: Success = {
      status: true,
      code: '00',
      message: 'Users retrieved successfully!',
      data: result
    }

    return res.status(200).json({
      responseJson
    });
   } catch (error) {
    const responseJson: Failure = {
      status: false,
      code: '-98',
      error: 'Error connecting to db'
    }

    return res.status(400).json({
      responseJson
    })
   }
  },
  createUser: async (req: Request, res: Response) => {
    if (req.body === null) {
      const responseJson: Failure = {
        status: false,
        code: '-99',
        error: 'Empty payload'
      }

      return res.status(400).json({
        responseJson
      });
    }

    try {
      const validate = validateUser(req.body);

      if (validate.error) {
        const responseJson: Failure = {
          status: false,
          code: '-99',
          error: 'Invalid input',
          data: validate.value
        }

        return res.status(400).json({
          responseJson
        });
      }

      const hashedPassword = await hash(req.body.password);

      const payload: IUserData = {
        username: req.body.username,
        password: hashedPassword === null ? '' : hashedPassword,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        verification_status: 1,
        date_created: new Date(),
        date_updated: new Date()
      }

      const result = await createUser(payload);

      if (result.length > 0) {
        const responseJson: Success = {
          status: true,
          code: '00',
          message: 'User created successfully!',
          data: null
        }
  
        return res.status(201).json({
          responseJson
        });
      }

      const responseJson: Failure = {
        status: false,
        code: '-99',
        error: 'Unable to create user!'
      }

      return res.status(400).json({
        responseJson
      });
    } catch (error) {
      const responseJson: Failure = {
        status: false,
        code: '-99',
        error: 'Bad request. ' + error
      }

      return res.status(400).json({
        responseJson
      });
    }
  }
}

export default user;