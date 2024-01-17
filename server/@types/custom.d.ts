import { IUser } from '../models/user.model';

import { Request } from 'express';

export interface RequestCustom extends Request {
    user?: IUser;
}
