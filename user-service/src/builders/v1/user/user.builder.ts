/**
 * @description Generate OTP and meta Token
 * @param payload - the query data
 * @author Fos Social Networking Dev Team
 */

import { CONSTANT } from '../../../common/constant.common';
import { ENUM } from '../../../common/enum.common';
import { sessionV1 } from '../../../entity/v1/userSession.v1.entity';
import { IUserSession } from '../../../models/user_sessions.model';
import { Auth } from '../../../service/auth.service';
export const prepareSignUpData = async (payload: IUser.Signup) => {
    try {
        payload.password = Auth.hashData(payload.password, CONSTANT.PASSWORD_HASH_SALT);
        return payload;
    } catch (error) {
        console.log('error--<prepareSignUpData>', error);
        return error;
    }
};

/**
 * @description Handle Session in login
 * @param payload - the query data
 * @author Fos Social Dev Team
 */

export const prepareSignInData = async (userData: any, payload: any) => {
    try {
        // UserV1.removeSessionByUserId(userData._id);
        const deviceDetails = payload.deviceDetails;
        const createUserSession: IUserSession = await sessionV1.createSession({
            userId: userData._id,
            status: ENUM.USER.STATUS.ACTIVE,
            deviceDetails: {
                ip: deviceDetails?.ip,
                deviceId: deviceDetails?.deviceId,
                deviceType: deviceDetails?.deviceType || 1,
                deviceToken: deviceDetails?.deviceToken,
                os: deviceDetails?.os,
            },
        });

        const buildTokenData = {
            sessionId: createUserSession._id,
            email: userData.email,
            userId: userData._id,
            userType: userData.userType,
            accountType: ENUM.ACCOUNT_TYPE.USER,
        };
        const genToken = Auth.generateUserToken({ type: 'USER_LOGIN', object: buildTokenData });

        return {
            _id: userData._id,
            authToken: genToken,
            name: userData.name,
            username: userData.username,
            userType: userData.userType,
        };
    } catch (error) {
        console.log('error--<prepareSignUpData>', error);
        return error;
    }
};

export const resetPasswordTokenData = async (userData: any) => {
    try {
        const buildTokenData = {
            userId: userData.userId,
            accountType: ENUM.ACCOUNT_TYPE.USER,
        };
        const genToken = Auth.generateUserToken({ type: 'FORGOT_PASSWORD', object: buildTokenData });
        console.log("------------------->",genToken)
        return genToken;
    } catch (error) {
        console.log('error--<prepareForgotPassword>', error);
    }
};
