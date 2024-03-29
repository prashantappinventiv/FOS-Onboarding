/**
 * @description Generate OTP and meta Token
 * @param payload - the query data
 * @author Fos Social Networking Dev Team
 */

import { CONSTANT } from '../../../common/constant.common';
import { ENUM } from '../../../common/enum.common';
import { sessionV1 } from '../../../controllers/v1/userSession.v1.entity';
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

export const prepareSignInData = async (userData: any) => {
    try {
        // UserV1.removeSessionByUserId(userData._id);
        const createUserSession: any = await sessionV1.createSession({
            userId: userData._id,
            status: ENUM.USER.STATUS.ACTIVE,
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
