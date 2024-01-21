require('dotenv').config();

import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import ejs from 'ejs';
import cloudinary from 'cloudinary';

import UserModel, { IUser } from '../models/user.model';
import ErrorHandler from '../utils/ErrorHandler';
import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import path from 'path';
import sendMail from '../utils/sendMails';
import {
    accessTokenOptions,
    refreshTokenOptions,
    sendToken,
} from '../utils/jwt';
import { redis } from '../utils/redis';
import { RequestCustom } from '../@types/custom';
import { getUserById } from '../services/user.service';

interface IRegistrationBody {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export const registrationUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body;

            const isEmailExist = await UserModel.findOne({ email });
            if (isEmailExist) {
                return next(new ErrorHandler('Email already exist', 400));
            }

            const user: IRegistrationBody = {
                name,
                email,
                password,
            };

            const activationToken = createActivationToken(user);

            const activationCode = activationToken.activationCode;

            const data = { user: { name: user.name }, activationCode };
            const html = await ejs.renderFile(
                path.join(__dirname, '../mails/activation-mail.ejs'),
                data
            );

            try {
                await sendMail({
                    email: user.email,
                    subject: 'EduHub - Activate your account',
                    template: 'activation-mail.ejs',
                    data,
                });

                res.status(201).json({
                    success: true,
                    message: `Please check your email: ${user.email} to activate your account!`,
                    activationToken: activationToken.token,
                });
            } catch (error: any) {
                return next(new ErrorHandler(error.message, 400));
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

interface IActivationToken {
    token: string;
    activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign(
        {
            user,
            activationCode,
        },
        process.env.ACTIVATION_SECRET as Secret,
        {
            expiresIn: '5m',
        }
    );

    return { token, activationCode };
};

// Activate user
interface IActivationRequest {
    activation_token: string;
    activation_code: string;
}

export const activateUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { activation_token, activation_code } =
                req.body as IActivationRequest;

            const newUser: { user: IUser; activationCode: string } = jwt.verify(
                activation_token,
                process.env.ACTIVATION_SECRET as string
            ) as { user: IUser; activationCode: string };

            if (newUser.activationCode !== activation_code) {
                return next(new ErrorHandler('Invalid activation code', 400));
            }

            const { name, email, password } = newUser.user;

            const existUser = await UserModel.findOne({ email });

            if (existUser) {
                return next(new ErrorHandler('Email already exists', 400));
            }
            await UserModel.create({
                name,
                email,
                password,
            });

            res.status(201).json({
                success: true,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// Login user
interface ILoginRequest {
    email: string;
    password: string;
}

export const loginUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body as ILoginRequest;

            if (!email || !password) {
                return next(
                    new ErrorHandler(
                        'Please enter your email and password',
                        400
                    )
                );
            }

            const user = await UserModel.findOne({ email: email }).select(
                '+password'
            );

            if (!user) {
                return next(new ErrorHandler('Invalid email or password', 400));
            }

            const isPasswordMatch = await user.comparePassword(password);
            if (!isPasswordMatch) {
                return next(new ErrorHandler('Invalid email or password', 400));
            }

            sendToken(user, 200, res);
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// Logout user
export const logoutUser = CatchAsyncError(
    async (req: RequestCustom, res: Response, next: NextFunction) => {
        try {
            res.cookie('access_token', '', { maxAge: 1 });
            res.cookie('refresh_token', '', { maxAge: 1 });

            const userId = req.user?._id || '';
            redis.del(userId);

            res.status(200).json({
                success: true,
                message: 'Logged out successfully',
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// Update access token
export const updateAccessToken = CatchAsyncError(
    async (req: RequestCustom, res: Response, next: NextFunction) => {
        try {
            const refresh_token = req.cookies.refresh_token as string;

            const errMessage = 'Could not refresh token';

            const decoded = jwt.verify(
                refresh_token,
                process.env.REFRESH_TOKEN as string
            ) as JwtPayload;
            if (!decoded) return next(new ErrorHandler(errMessage, 400));

            const session = await redis.get(decoded.id as string);
            if (!session) return next(new ErrorHandler(errMessage, 400));

            const user = JSON.parse(session);

            const accessToken = jwt.sign(
                { id: user._id },
                process.env.ACCESS_TOKEN as string,
                { expiresIn: '5m' }
            );

            const refreshToken = jwt.sign(
                { id: user._id },
                process.env.REFRESH_TOKEN as string,
                {
                    expiresIn: '3d',
                }
            );

            req.user = user;

            res.cookie('access_token', accessToken, accessTokenOptions);
            res.cookie('refresh_token', refreshToken, refreshTokenOptions);

            res.status(200).json({
                status: 'success',
                accessToken,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// Get user info
export const getUserInfo = CatchAsyncError(
    async (req: RequestCustom, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?._id;
            getUserById(userId, res);
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// Social auth
interface ISocialAuthBody {
    email: string;
    name: string;
    avatar: string;
}

export const socialAuth = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, name, avatar } = req.body as ISocialAuthBody;

            const user = await UserModel.findOne({ email: email });

            if (!user) {
                const newUser = await UserModel.create({ email, name, avatar });
                sendToken(newUser, 200, res);
            } else {
                sendToken(user, 200, res);
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// Update user info
interface IUpdateInfo {
    name?: string;
    email?: string;
}

export const updateInfo = CatchAsyncError(
    async (req: RequestCustom, res: Response, next: NextFunction) => {
        try {
            const { name, email } = req.body as IUpdateInfo;
            const userId = req.user?._id;

            const user = await UserModel.findById(userId);

            if (email && user) {
                const isEmailExist = await UserModel.findOne({ email });
                if (isEmailExist)
                    return next(new ErrorHandler('Email already exists', 400));
            }

            if (name && user) {
                user.name = name;
            }

            await user?.save();

            await redis.set(userId, JSON.stringify(user));

            res.status(201).json({
                success: true,
                user,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// Update password
interface IUpdatePassword {
    currentPassword: string;
    newPassword: string;
}

export const updatePassword = CatchAsyncError(
    async (req: RequestCustom, res: Response, next: NextFunction) => {
        try {
            const { currentPassword, newPassword } =
                req.body as IUpdatePassword;
            const userId = req.user?._id;

            if (!currentPassword || !newPassword)
                return next(
                    new ErrorHandler(
                        'Please enter current and new password',
                        400
                    )
                );

            if (currentPassword === newPassword)
                return next(
                    new ErrorHandler(
                        'New password must be different from the current password',
                        400
                    )
                );

            const user = await UserModel.findById(userId).select('+password');
            if (user?.password === undefined)
                return next(new ErrorHandler('Invalid user', 400));

            const isPasswordMatch = await user?.comparePassword(
                currentPassword
            );
            if (!isPasswordMatch)
                return next(new ErrorHandler('Invalid current password', 400));

            user.password = newPassword;

            await user.save();
            await redis.set(userId, JSON.stringify(user));

            res.status(201).json({
                success: true,
                user,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// Update avatar
interface IUpdateAvatar {
    avatar: string;
}

export const updateAvatar = CatchAsyncError(
    async (req: RequestCustom, res: Response, next: NextFunction) => {
        try {
            const { avatar } = req.body as IUpdateAvatar;

            const userId = req.user?._id;
            const user = await UserModel.findById(userId);

            if (avatar && user) {
                if (user?.avatar?.public_id) {
                    // Delete the old avatar first
                    await cloudinary.v2.uploader.destroy(
                        user?.avatar?.public_id
                    );

                    // Upload new avatar
                    const myCloud = await cloudinary.v2.uploader.upload(
                        avatar,
                        { folder: 'avatars', width: 150 }
                    );

                    user.avatar = {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    };
                } else {
                    const myCloud = await cloudinary.v2.uploader.upload(
                        avatar,
                        { folder: 'avatars', width: 150 }
                    );

                    user.avatar = {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    };
                }
            }

            await user?.save();
            await redis.set(userId, JSON.stringify(user));

            res.status(200).json({
                success: true,
                user,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
