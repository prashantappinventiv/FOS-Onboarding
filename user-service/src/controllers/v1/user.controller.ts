import { RESPONSE } from '../../common/responses';
import { UserService } from '../../service/v1/user.service';
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
            const payload: IUser.Signup = req.body;
            await UserService.userSignup(payload);
            return this.sendResponse(res, RESPONSE.USER.SIGNUP_SUCCESSFULLY, {});
        } catch (err) {
            console.log('err=================>userSignUp', err);
            return this.sendResponse(res, RESPONSE.commonErrorHandler(err, 500), {});
        }
    }

    /**
     * @method POST
     * @description User login
     * @param payload - req.body
     * @author FOS - Social media
     */
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const payload: IUser.Login = req.body;
            await UserService.userLogin(payload);
            return this.sendResponse(res, RESPONSE.USER.OTP_SEND, {});
        } catch (err) {
            console.log('err=====================>userLogin', err);
            return this.sendResponse(res, RESPONSE.commonErrorHandler(err, 500), {});
        }
    }

    /**
     * @method POST
     * @description Verify otp
     * @param payload - req.body
     * @author Fos - Socail media
     */
    async verifyOtpController(req: Request, res: Response, next: NextFunction) {
        try {
            const payload: IUser.VerifyOtp = req.body;
            const result = await UserService.verifyOtpService(payload);
            if (result) {
                return this.sendResponse(res, RESPONSE.USER.OTP_VERIFIED, result);
            }
        } catch (err) {
            console.log('err=====================>verifyOtp', err);
            return this.sendResponse(res, RESPONSE.commonErrorHandler(err, 500), {});
        }
    }
}
export const UserController = new UserClass();
