import express from 'express';

import {
    activateUser,
    deleteUser,
    getAllUsers,
    getUserInfo,
    loginUser,
    logoutUser,
    registrationUser,
    socialAuth,
    updateAccessToken,
    updateAvatar,
    updateInfo,
    updatePassword,
    updateUserRole,
} from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register', registrationUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticated, logoutUser);

userRouter.post('/activate-user', activateUser);
userRouter.get('/refresh', updateAccessToken);

userRouter.get('/me', updateAccessToken, isAuthenticated, getUserInfo);
userRouter.put('/update-info', updateAccessToken, isAuthenticated, updateInfo);
userRouter.put('/update-password', updateAccessToken, isAuthenticated, updatePassword);
userRouter.put('/update-avatar', updateAccessToken, isAuthenticated, updateAvatar);
userRouter.post('/social-auth', socialAuth);

userRouter.get(
  "/get-users",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
userRouter.put(
  "/update-role",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);
userRouter.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;
