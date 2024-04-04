import { Schema, Document } from 'mongoose';
import { ENUM, ENUM_ARRAY } from '../common/enum.common';

export interface IUserSession extends Document {
    userId: string;
    platform?: string;
    isActive?: number;
    deviceDetails?: {
        ip: string;
        deviceId: string;
        deviceType: number;
        deviceToken?: string;
        os?: string;
    };
}

export const UserSessionSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true, index: true, ref: ENUM.COL.USER },
        platform: { type: Schema.Types.Number, default: ENUM.PLATFORM.ANDROID },
        isActive: { type: Schema.Types.Number, default: ENUM.USER.STATUS.ACTIVE },
        deviceDetails: {
            ip: { type: Schema.Types.String, trim: true },
            deviceId: { type: Schema.Types.String, trim: true },
            deviceType: { type: Schema.Types.Number, required: true },
            deviceToken: { type: Schema.Types.String, trim: true },
            os: { type: Schema.Types.String, trim: true },
        },
    },
    {
        versionKey: false,
        timestamps: true,
        collection: ENUM.COL.USER_SESSION,
    }
);
