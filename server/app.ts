require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';
import userRouter from './routes/user.routes';
import courseRouter from './routes/course.routes';
import orderRouter from './routes/order.routes';
import notificationRouter from './routes/notification.routes';

// Body parser
app.use(express.json({ limit: '50mb' }));

// Cookie parser
app.use(cookieParser());

// CORS
app.use(
    cors({
        origin: process.env.ORIGIN,
    })
);

// Routes
app.use('/api/v1/', userRouter);
app.use('/api/v1/', courseRouter);
app.use('/api/v1/', orderRouter);
app.use('/api/v1/', notificationRouter);

// Testing API
app.get('/test', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'API is working',
    });
});
// Unknown route
app.get('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

app.use(ErrorMiddleware);
