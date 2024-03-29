/**
 * @name user.model
 * @description defines schema for user model
 * @author Five Star Dev Team
 */

import { Schema, model } from 'mongoose';
import { ENUM, ENUM_ARRAY } from '../common';

const deviceDetails = new Schema(
    {
        deviceId: { type: String, trim: true },
        deviceType: { type: Number, enum: ENUM_ARRAY.PLATFORM, required: true },
        deviceToken: { type: String, trim: true },
        model: { type: String, trim: true },
    },
    {
        _id: false,
        timestamps: false,
    }
);

export const UserSchema: any = new Schema(
    {
        // zipcode: { type: String },
        // phoneNo: { type: String, trim: true },
        email: { type: String, required: true, trim: true },
        // countryCode: { type: String, trim: true },
        password: { type: String },
        status: { type: Number, enum: ENUM_ARRAY.USER.STATUS, default: ENUM.USER.STATUS.ACTIVE },
        name: { type: String, trim: true },
        // deviceDetails: { type: deviceDetails, trim: true },
        // profileImage: { type: String, default: '' },
        role: {
            type: String,
            enum: [ENUM.ROLE.CONTENT, ENUM.ROLE.UPCOMING_CONTENT, ENUM.ROLE.VIEWER],
            required: true,
        },
    },
    {
        versionKey: false,
        collection: ENUM.COL.USER,
        timestamps: true,
    }
);

UserSchema.index({ name: 1 });
// UserSchema.index({ phoneNo: 1 });
UserSchema.index({ email: 1 });

export default model<IUser.User>(ENUM.COL.USER, UserSchema);
