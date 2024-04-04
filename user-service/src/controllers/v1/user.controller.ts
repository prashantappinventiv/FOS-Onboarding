import { RESPONSE } from '../../common/responses';
import { UserService } from '../../service/v1/user.service';
import { User } from '../../typings/user.typings';
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
            const payload: IUser.VerifyOtp = {
                userId: req.body.userId,
                otp: req.body.otp,
                type: req.body.type,
                deviceDetails: {
                    ip: Array.isArray(req.headers.ip) ? req.headers.ip.join(',') : req.headers.ip || '',
                    deviceId: Array.isArray(req.headers.deviceid) ? req.headers.deviceid.join(',') : req.headers.deviceid || '',
                    deviceType:
                        parseInt(Array.isArray(req.headers.devicetype) ? req.headers.devicetype[0] : req.headers.devicetype || '1', 10) ||
                        1,
                    deviceToken: Array.isArray(req.headers.devicetoken) ? req.headers.devicetoken.join(',') : req.headers.devicetoken || '',
                    os: Array.isArray(req.headers.os) ? req.headers.os.join(',') : req.headers.os || '',
                },
            };
            const result = await UserService.verifyOtpService(payload);
            if (result) {
                return this.sendResponse(res, RESPONSE.USER.OTP_VERIFIED, result);
            }
        } catch (err) {
            console.log('err=====================>verifyOtp', err);
            return this.sendResponse(res, RESPONSE.commonErrorHandler(err, 500), {});
        }
    }

    /**
     * @method POST
     * @description Forgot Password
     * @param payload - req.body
     * @author Fos - Socail media
     */
    async forgotPasswordController(req: Request, res: Response, next: NextFunction) {
        try {
            const payload: User = req.body;
            const result = await UserService.forgotPassworService(payload);
            if (result) {
                return this.sendResponse(res, RESPONSE.USER.OTP_SEND, result);
            }
        } catch (err) {
            console.log('err=====================>forgot password', err);
            return this.sendResponse(res, RESPONSE.commonErrorHandler(err, 500), {});
        }
    }

    /**
     * @method PUT
     * @description Reset Password
     * @param payload - req.body
     * @author Fos Social media
     */
    async resetPasswordController(req: Request, res: Response, next: NextFunction) {
        try {
            const payload: IUser.resetPassword = req.body;
            const result = await UserService.resetPasswordService(payload);
            if (result) {
                return this.sendResponse(res, RESPONSE.USER.RESET_PASSWORD, result);
            }
        } catch (err) {
            console.log('err==================> reset password', err);
            return this.sendResponse(res, RESPONSE.commonErrorHandler(err, 500), {});
        }
    }
}
export const UserController = new UserClass();
