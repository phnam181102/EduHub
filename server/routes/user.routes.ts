import express from 'express';

import { regestrationUser } from '../controllers/users.controller';

const userRouter = express.Router();

userRouter.post('/registration', regestrationUser);

export default userRouter;
