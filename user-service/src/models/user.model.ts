/**
 * @name user.model
 * @description defines schema for user model
 * @author Five Star Dev Team
 */

import { Schema, SchemaTypes, model } from 'mongoose';
import { ENUM, ENUM_ARRAY } from '../common';

const deviceDetails = new Schema(
    {
        deviceId: { type: String, trim: true },
        deviceIP: { type: String, trim: true },
        deviceType: { type: Number, enum: ENUM_ARRAY.PLATFORM, required: true },
        deviceToken: { type: String, trim: true },
        model: { type: String, trim: true },
    },
    {
        _id: false,
        timestamps: false,
    }
);

export const userHistorySchema = new Schema(
    {
        deviceDetails: { type: deviceDetails, trim: true },
        apiEndPoint: {type: String, required: true},
        action: {type: String, enum: ENUM.ACTION, required: true},
        payload: {type: String, trim: true, required: true},
        responseStatus: {type: Number, required: true},
        responseMessage: {type: String, required: true}
    },
    {
        _id: false,
    }
)

export const UserSchema: any = new Schema(
    {
        // zipcode: { type: String },
        // phoneNo: { type: String, trim: true },
        email: { type: String, required: true, trim: true },
        // countryCode: { type: String, trim: true },
        password: { type: String },
        status: { type: Number, enum: ENUM_ARRAY.USER.STATUS, default: ENUM.USER.STATUS.ACTIVE },
        name: { type: String, trim: true, unique: true },
        // deviceDetails: { type: deviceDetails, trim: true },
        // profileImage: { type: String, default: '' },
        role: {
            type: String,
            enum: [ENUM.ROLE.CONTENT, ENUM.ROLE.UPCOMING_CONTENT, ENUM.ROLE.VIEWER],
            required: true,
        },
        history: [userHistorySchema]
    },
    {
        versionKey: false,
        collection: ENUM.COL.USER,
        timestamps: true,
    }
);

UserSchema.index({ name: 1 }, { unique: true });
// UserSchema.index({ phoneNo: 1 });
UserSchema.index({ email: 1 });

export default model<IUser.User>(ENUM.COL.USER, UserSchema);
