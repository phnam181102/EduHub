import express from 'express';

import {
    activateUser,
    loginUser,
    logoutUser,
    regestrationUser,
} from '../controllers/users.controller';

const userRouter = express.Router();

userRouter.post('/register', regestrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);

export default userRouter;
