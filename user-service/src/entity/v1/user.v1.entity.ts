/**
 * @file user.v1.entity
 * @description defines v1 user entity methods
 * @author Five Star Dev Team
 */

import { Model } from 'mongoose';
import BaseEntity from '../base-mongo.entity';
import { ENUM } from '../../common/enum.common';
import { AcceptAny } from '../../interfaces/types';
import userModel from '../../models/user.model';

class UserEntity extends BaseEntity {
    constructor(model: Model<any>) {
        super(model);
    }

    /**
     * @description To create a new user
     * @param payload
     */
    async createUser(payload: any): Promise<IUser.User> {
        const userData = await new this.model(payload).save();
        return userData.toObject();
    }

    /**
     * @description To delete duplicate user
     * @param query
     */

    async deleteDuplicateUser(params: IUser.Signup) {
        try {
            const query: any = {};
            query['$and'] = [
                {
                    $and: [{ email: params.email }, { emailVerify: false }],
                },
            ];
            query.status = { $in: [ENUM.USER.STATUS.INACTIVE, ENUM.USER.STATUS.ACTIVE] };
            return await this.remove(query);
        } catch (err: AcceptAny) {
            console.log('Error in deleteDuplicateUser userEntity', err);
            throw new Error(err);
        }
    }

    /**
     * @description To find user by email or mobile number
     */

    async findUserByEmailOrMobileNo(params: IUser.Signup | any) {
        try {
            const query: any = {};
            query['$or'] = [
                {
                    $and: [{ email: params.email }, { emailVerify: true }],
                },
                {
                    $and: [{ phoneNo: params.phoneNo }, { phoneVerify: true }],
                },
            ];
            const options = { lean: true };
            return await this.findOne<IUser.User>(query, {}, options);
        } catch (err: any) {
            console.log('Error in findUserByEmailOrMobileNo userEntity', err);
            throw new Error(err);
        }
    }
}
export const UserV1 = new UserEntity(userModel);
