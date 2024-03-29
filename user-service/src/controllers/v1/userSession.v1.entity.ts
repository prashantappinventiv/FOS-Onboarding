/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file userSession.v1.entity
 * @description defines v1 user session entity methods
 * @author Five Star Dev Team
 */

import { Model } from 'mongoose';
import BaseEntity from '../../entity/base-mongo.entity';
import sessionModel from '../../models/user_sessions.model';
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
export const sessionV1 = new UserSessionEntity(sessionModel);
