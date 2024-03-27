import builders from '../../builders';
import { ENUM } from '../../common/enum.common';
import { RESPONSE } from '../../common/responses';
import { UserV1 } from '../../entity/v1/user.v1.entity';
import { AcceptAny } from '../../interfaces/types';
import { Signup } from '../../typings/user.typings';
import BaseClass from '../base.controller';
import { Request, Response, NextFunction } from 'express';

class UserClass extends BaseClass {
    /**
     * @method POST
     * @description User signup
     * @param payload - req.body
     * @author FOS - Social media
     */
    async userSignUp(req: Request, res: Response, next: NextFunction) {
        try {
            let payload: AcceptAny = req.body;
            await UserV1.deleteDuplicateUser(payload);
            const userExists: IUser.User = await UserV1.findUserByEmailOrMobileNo(payload);
            payload = await builders.User.user.prepareSignUpData(payload);
            let userData: IUser.User;
            if (!userExists) {
                userData = await UserV1.createUser(payload);
            } else if (userExists.status === ENUM.USER.STATUS.INACTIVE) return this.sendResponse(res, RESPONSE.USER.ACCOUNT_BLOCKED, {});
            else if (userExists.email === payload.email) return this.sendResponse(res, RESPONSE.USER.EMAIL_EXIST, {});
            return this.sendResponse(res, RESPONSE.USER.SIGNUP_SUCCESSFULLY, {});
        } catch (err) {
            console.log('err=================>userSignUp', err);
            return this.sendResponse(res, RESPONSE.commonErrorHandler(err, 500), {});
        }
    }
}
export const UserController = new UserClass();
