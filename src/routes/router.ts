import express, { Request, Response} from 'express';
import { Success } from 'src/common/apiResponse';

import user from '../controllers/User';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const responseJson: Success = {
    status: true,
    code: '00',
    message: 'Welcome to Demo Credit',
    data: []
  }
  res.status(200).json({
    responseJson
  });
});

router.get('/getUsers', user.allUsers);

export default router;