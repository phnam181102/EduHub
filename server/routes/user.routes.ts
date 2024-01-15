import express from 'express';

import {
    activateUser,
    regestrationUser,
} from '../controllers/users.controller';

const userRouter = express.Router();

userRouter.post('/registration', regestrationUser);
userRouter.post('/activate-user', activateUser);

export default userRouter;
