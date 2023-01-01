import { Request, Response } from 'express';

import { getAllUsers } from '../data/queries';
import { Success, Failure } from '../common/apiResponse'

const user = {
  allUsers: async (req: Request, res: Response) => {
   try {
    let response = await getAllUsers();

    const responseJson: Success = {
      status: true,
      code: '00',
      message: 'Users retrieved successfully!',
      data: response
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
  }
}

export default user;