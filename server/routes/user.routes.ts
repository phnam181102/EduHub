import express from 'express';

import {
    activateUser,
    getUserInfo,
    loginUser,
    logoutUser,
    regestrationUser,
    socialAuth,
    updateAccessToken,
} from '../controllers/users.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register', regestrationUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticated, logoutUser);

userRouter.post('/activate-user', activateUser);
userRouter.get('/refresh', updateAccessToken);

userRouter.get('/me', isAuthenticated, getUserInfo);
userRouter.post('/social-auth', socialAuth);

export default userRouter;
