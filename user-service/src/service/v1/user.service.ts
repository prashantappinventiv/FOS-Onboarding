import builders from '../../builders';
import { CONSTANT, DATABASE_CONST, ENVIORNMENT } from '../../common/constant.common';
import { ENUM } from '../../common/enum.common';
import { MSG } from '../../common/responses/user.response';
import { UserV1 } from '../../entity/v1/user.v1.entity';
import { ExceptionMessage } from '../../interfaces/enum';
import { CustomException } from '../../providers/utils/exception.utils';
import { Login, Signup, User, VerifyOtp } from '../../typings/user.typings';
import { Auth } from '../auth.service';
import { utils } from '../../providers/utils/utils';
import otpModel from '../../models/otp.model';
import { OtpV1 } from '../../entity/v1/otp.v1.entity';

class UserServiceClass {
    async userSignup(payload: Signup) {
        try {
            const userNameExist: IUser.User = await UserV1.findUserByName(payload);
            if (userNameExist) {
                throw new CustomException(MSG.USER_NAME_ALREADY_REGISTER);
            }
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
            const otpExpiry = new Date(Date.now() + 600000);

            const existingOtp: any = await otpModel.findOne({ otpType: ENUM.OTP_TYPE.LOGIN });

            if (existingOtp) {
                await otpModel.updateOne({ userId: userData._id }, { $set: { otp: otp, otpTimeStamp: otpExpiry, isVerified: false } });
            } else {
                await otpModel.create({
                    userId: userData._id,
                    otp: otp,
                    otpTimeStamp: otpExpiry,
                    isVerified: false,
                });
            }
            if (process.env.NODE_ENV == ENVIORNMENT.PRODUCTION || process.env.NODE_ENV == ENVIORNMENT.PREPROD) {
            }
        } catch (err) {
            throw err;
        }
    }

    async verifyOtpService(payload: VerifyOtp) {
        const otpData = await OtpV1.findOne({ otpType: payload.type });
        if (!otpData) {
            throw new CustomException(ExceptionMessage.INVALID_OTP, 401);
        }

        if (process.env.NODE_ENV === ENVIORNMENT.PRODUCTION || process.env.NODE_ENV === ENVIORNMENT.PREPROD) {
            if (otpData.otp != payload.otp || otpData.isVerified === 'true') {
                throw new CustomException(ExceptionMessage.INVALID_OTP, 401);
            } else {
                const userData = await UserV1.findOne({ _id: payload.userId });
                if (payload.type == ENUM.OTP_TYPE.LOGIN) {
                    const response = await builders.User.user.prepareSignInData(userData, payload);
                    await OtpV1.updateDocument({ otpType: payload.type }, { isVerified: true }, { new: true });
                    return response;
                } else if (payload.type == ENUM.OTP_TYPE.FORGOT_PASSWORD) {
                    const response = builders.User.user.resetPasswordTokenData(payload);
                    return response;
                }
            }
        }

        if (otpData.otpTimeStamp && otpData.otpTimeStamp < new Date()) {
            throw new CustomException(ExceptionMessage.OTP_EXPIRED, 401);
        }

        if (process.env.NODE_ENV === ENVIORNMENT.LOCAL) {
            if (otpData.otp != payload.otp || otpData.isVerified === true) {
                throw new CustomException(ExceptionMessage.INVALID_OTP, 401);
            }
            if (otpData.otp == payload.otp || payload.otp == CONSTANT.BYPASS_OTP) {
                const userData = await UserV1.findOne({ _id: payload.userId });
                if (payload.type == ENUM.OTP_TYPE.LOGIN) {
                    const response = await builders.User.user.prepareSignInData(userData, payload);
                    await OtpV1.updateDocument({ otpType: payload.type }, { isVerified: true }, { new: true });
                    return response;
                } else if (payload.type == ENUM.OTP_TYPE.FORGOT_PASSWORD) {
                    const response = await builders.User.user.resetPasswordTokenData(payload);
                    await OtpV1.updateDocument({ otpType: payload.type }, { isVerified: true }, { new: true });
                    return response;
                }
            }
        }
    }

    async forgotPassworService(payload: User) {
        const userDetails = await UserV1.findUserByEmail({ email: payload.email });
        if (!userDetails) throw new CustomException(ExceptionMessage.EMAIL_NOT_REGISTERED, 400);
        if (userDetails.status === ENUM.USER.STATUS.DELETED || userDetails.status === ENUM.USER.STATUS.INACTIVE)
            throw new CustomException(ExceptionMessage.ACCOUNT_BLOCKED, 403);
        const data = {
            otp: utils.generateOtp(),
            otpType: ENUM.OTP_TYPE.FORGOT_PASSWORD,
            isVerified: false,
            userId: userDetails._id,
            otpTimeStamp: +new Date() + DATABASE_CONST.TTL.OTP_EXPIRE_TIME,
        };
        const OtpDetails = await OtpV1.findOne({ otpType: ENUM.OTP_TYPE.FORGOT_PASSWORD });
        if (OtpDetails && OtpDetails.otpType == ENUM.OTP_TYPE.FORGOT_PASSWORD) {
            const otpData = await OtpV1.updateDocument<IUser.User>({ otpType: ENUM.OTP_TYPE.FORGOT_PASSWORD }, data, { new: true });
            return otpData;
        } else {
            const otpData = await OtpV1.saveData(data);
            return otpData;
        }
    }

    async resetPasswordService(payload: IUser.resetPassword) {
        const userDetails = await UserV1.findUserByEmail(payload);

        if (!userDetails) {
            throw new CustomException(ExceptionMessage.USER_NOT_EXISTS);
        }

        if (userDetails.status === ENUM.USER.STATUS.DELETED || userDetails.status === ENUM.USER.STATUS.INACTIVE) {
            throw new CustomException(ExceptionMessage.ACCOUNT_BLOCKED, 403);
        }

        const tokenVerify = Auth.verifyToken(payload.resetPasswordToken);

        if (!tokenVerify) {
            throw new CustomException(ExceptionMessage.AUTH_INVALID_TOKEN);
        }
        const data = Auth.hashData(payload.password, CONSTANT.PASSWORD_HASH_SALT);

        const updateUserDetails = await UserV1.findOneAndUpdate({ email: payload.email }, { password: data }, { new: true });

        if (updateUserDetails) {
            return updateUserDetails;
        } else {
            throw new CustomException(ExceptionMessage.SOMETHING_WENT_WRONG);
        }
    }
}
export const UserService = new UserServiceClass();
