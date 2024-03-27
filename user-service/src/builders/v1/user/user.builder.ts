/**
 * @description Generate OTP and meta Token
 * @param payload - the query data
 * @author Fos Social Networking Dev Team
 */

import { CONSTANT } from '../../../common/constant.common';
import { Auth } from '../../../service/auth.service';
export const prepareSignUpData = async (payload: IUser.Signup) => {
    try {
        payload.password = Auth.hashData(payload.password, CONSTANT.PASSWORD_HASH_SALT);
        // payload.otpTimeStamp = +new Date() + DATABASE_CONST.TTL.OTP_EXPIRE_TIME;
        // payload.userType = ENUM.USER.USER_TYPE.NA;

        return payload;
    } catch (error) {
        console.log('error--<prepareSignUpData>', error);
        return error;
    }
};
