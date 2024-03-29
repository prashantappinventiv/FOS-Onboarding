/**
 * @file user_sessions.model
 * @description defines schema for user session model
 * @author Five Star Dev Team
 */

import { Schema, model, SchemaTypes } from 'mongoose';
import { ENUM, ENUM_ARRAY } from '../common/enum.common';

const deviceDetails = new Schema(
    {
        deviceId: { type: SchemaTypes.String, trim: true },
        deviceType: { type: Number, enum: ENUM_ARRAY.PLATFORM, required: true },
        deviceToken: { type: SchemaTypes.String, trim: true },
        model: { type: SchemaTypes.String, trim: true },
    },
    {
        _id: false,
        timestamps: false,
    }
);
const userSessionSchema = new Schema(
    {
        userId: { type: SchemaTypes.ObjectId, required: true, index: true, ref: ENUM.COL.USER },
        lastLogin: { type: Number },
        deviceDetails: { type: deviceDetails, trim: true },
        isActive: { type: SchemaTypes.Boolean, default: true },
    },
    {
        versionKey: false,
        timestamps: true,
        collection: ENUM.COL.USER_SESSION,
    }
);

userSessionSchema.index({ '$**': 1 });
export default model<IUser.UserSession>(ENUM.COL.USER_SESSION, userSessionSchema);
