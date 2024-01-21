import express from 'express';

import {
    activateUser,
    getUserInfo,
    loginUser,
    logoutUser,
    registrationUser,
    socialAuth,
    updateAccessToken,
    updateAvatar,
    updateInfo,
    updatePassword,
} from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register', registrationUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticated, logoutUser);

userRouter.post('/activate-user', activateUser);
userRouter.get('/refresh', updateAccessToken);

userRouter.get('/me', isAuthenticated, getUserInfo);
userRouter.put('/update-info', isAuthenticated, updateInfo);
userRouter.put('/update-password', isAuthenticated, updatePassword);
userRouter.put('/update-avatar', isAuthenticated, updateAvatar);
userRouter.post('/social-auth', socialAuth);

export default userRouter;
