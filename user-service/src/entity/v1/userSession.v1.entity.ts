/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file userSession.v1.entity
 * @description defines v1 user session entity methods
 * @author Fos Social Dev Team
 */

import { Model, model } from 'mongoose';
import BaseEntity from '../base-mongo.entity';
import { IUserSession, UserSessionSchema } from '../../models/user_sessions.model';
import { ENUM } from '../../common';
class UserSessionEntity extends BaseEntity {
    constructor(model: Model<any>) {
        super(model);
    }

    /**
     * @description To creates a session
     * @param payload
     */

    async createSession(payload: any) {
        try {
            const sessionData = await new this.model(payload).save();
            return sessionData.toObject();
        } catch (err: any) {
            console.log('Error in createSession session entity', err);
            throw new Error(err);
        }
    }
}

const UserSessionModel: Model<IUserSession> = model<IUserSession>(ENUM.COL.USER_SESSION, UserSessionSchema);

export const sessionV1 = new UserSessionEntity(UserSessionModel);
