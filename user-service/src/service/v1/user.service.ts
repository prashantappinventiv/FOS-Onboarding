import { Utils } from 'sequelize';
import builders from '../../builders';
import { CONSTANT, ENVIORNMENT } from '../../common/constant.common';
import { ENUM } from '../../common/enum.common';
import { MSG } from '../../common/responses/user.response';
import { UserV1 } from '../../entity/v1/user.v1.entity';
import { ExceptionMessage } from '../../interfaces/enum';
import { CustomException } from '../../providers/utils/exception.utils';
import { Login, Signup } from '../../typings/user.typings';
import { Auth } from '../auth.service';
import { utils } from '../../providers/utils/utils';
import { Otp } from '../../models/otp.model';

class UserServiceClass {
    async userSignup(payload: Signup) {
        try {
            await UserV1.deleteDuplicateUser(payload);
            const userExists: IUser.User = await UserV1.findUserByEmail(payload);
            const data = await builders.User.user.prepareSignUpData(payload);
            let userData: IUser.User;
            if (!userExists) {
                userData = await UserV1.createUser(data);
            } else if (userExists.status === ENUM.USER.STATUS.INACTIVE) {
                throw new CustomException(MSG.ACCOUNT_BLOCKED, 400);
            } else if (userExists.email === payload.email) {
                throw new CustomException(ExceptionMessage.EMAIL_ALREADY_EXIST, 400);
            } else if (userExists.name === payload.name) {
                throw new CustomException(ExceptionMessage.USER_ALREADY_EXIST, 403);
            }
        } catch (err) {
            throw err;
        }
    }

    async userLogin(payload: Login) {
        try {
            const queryObj: any = {};
            let userData: any;

            const hash = Auth.hashData(payload.password, CONSTANT.PASSWORD_HASH_SALT);
            if (payload.email) queryObj['email'] = payload.email;
            if (payload.name) {
                delete queryObj.email;
                queryObj['name'] = payload.name;
            }
            userData = await UserV1.findMany(queryObj, {}, { sort: { updatedAt: -1 } });
            userData = userData.length ? userData[0] : undefined;
            if (!userData) throw new CustomException(ExceptionMessage.USER_NOT_FOUND, 404);

            if (payload.email) {
                if (!userData) {
                    throw new CustomException(ExceptionMessage.EMAIL_NOT_REGISTERED, 400);
                }
            }

            if (payload.name) {
                if (!userData) throw new CustomException(ExceptionMessage.USER_NOT_REGISTER, 400);
            }

            if (userData && userData.status === ENUM.USER.STATUS.INACTIVE) throw new CustomException(ExceptionMessage.USER_BLOCKED, 403);
            if (userData.password != hash) {
                throw new CustomException(ExceptionMessage.INCORRECT_PASSWORD, 400);
            }
            const otp = utils.generateOtp();
            const updateOtpDetails = {
                otp: otp,
                expiary: new Date(Date.now() + 600000),
                isVerified: false,
            };
            await Otp.updateOne({ user: userData._id }, { $set: updateOtpDetails });
            if (process.env.NODE_ENV == ENVIORNMENT.PRODUCTION || process.env.NODE_ENV == ENVIORNMENT.PREPROD) {
            }
        } catch (err) {
            throw err;
        }
    }

    async verifyOtpService(payload: IUser.VerifyOtp) {
        const otpData = await Otp.findOne({ user: payload.userId });
        if (!otpData) {
            throw new CustomException(ExceptionMessage.INVALID_OTP, 401);
        }
        if (process.env.NODE_ENV === ENVIORNMENT.PRODUCTION) {
            if (otpData.otp != payload.otp) {
                throw new CustomException(ExceptionMessage.INVALID_OTP, 401);
            }
        }
        if (otpData.expiary && otpData.expiary.getTime() < Date.now()) {
            throw new CustomException(ExceptionMessage.OTP_EXPIRED, 401);
        }

        if (process.env.NODE_ENV === ENVIORNMENT.LOCAL) {
            if (otpData.otp == payload.otp || payload.otp == CONSTANT.BYPASS_OTP) {
                const userData = await UserV1.findOne({ _id: payload.userId });
                const response = await builders.User.user.prepareSignInData(userData);
                return response;
            }
        }

        if (process.env.NODE_ENV === ENVIORNMENT.PRODUCTION || process.env.NODE_ENV === ENVIORNMENT.PREPROD) {
            if (otpData.otp == payload.otp) {
                const userData = await UserV1.findOne({ _id: payload.userId });
                const response = await builders.User.user.prepareSignInData(userData);
                return response;
            }
        }
    }
}
export const UserService = new UserServiceClass();
