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
import user_sessionsModel from '../../models/user_sessions.model';
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
        console.log('------______>', userData);
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

    async findUserByEmail(params: IUser.Signup | any) {
        try {
            const query: any = {};
            query['$or'] = [
                {
                    $and: [{ email: params.email }],
                },
            ];
            const options = { lean: true };
            return await this.findOne<IUser.User>(query, {}, options);
        } catch (err: any) {
            console.log('Error in findUserByEmailOrMobileNo userEntity', err);
            throw new Error(err);
        }
    }

    /**
     * @description To find user by name
     */

    async findUserByName(params: IUser.Signup | any) {
        try {
            const query: any = {};
            query['$or'] = [
                {
                    $and: [{ name: params.name }],
                },
            ];
            const options = { lean: true };
            return await this.findOne<IUser.User>(query, {}, options);
        } catch (err: any) {
            console.log('Error in findUserByEmailOrMobileNo userEntity', err);
            throw new Error(err);
        }
    }

    /**
     * @description finds multiple records based on condition
     * @param condition
     * @param projection
     */

    async findMany<T>(condition: IApp.DataKeys, project: IApp.DataKeys = {}, options?: IApp.DataKeys, collation?: any): Promise<T[]> {
        // condition.isDelete = false;
        if (collation) return await this.model.find(condition, project, options).collation(collation).lean().exec();
        return await this.model.find(condition, project, options).lean().exec();
    }

    /**
     * @description To remove session by user id
     * @param id
     */

    async removeSessionByUserId(id: any) {
        return await user_sessionsModel.deleteMany({ userId: id });
    }
}
export const UserV1 = new UserEntity(userModel);
