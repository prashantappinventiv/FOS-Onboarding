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
        zipcode: { type: String },
        phoneNo: { type: String, trim: true },
        email: { type: String, required: true, trim: true },
        countryCode: { type: String, trim: true },
        password: { type: String },
        status: { type: Number, enum: ENUM_ARRAY.USER.STATUS, default: ENUM.USER.STATUS.ACTIVE },
        username: { type: String, trim: true },
        accountVerify: { type: Boolean, default: false },
        phoneVerify: { type: Boolean, default: false },
        deviceDetails: { type: deviceDetails, trim: true },
        emailVerify: { type: Boolean, default: false },
        otp: { type: String },
        otpTimeStamp: { type: String },
        otpAttempts: { type: Number, default: 3 },
        profileImage: { type: String, default: '' },
        isPublic: { type: Boolean, default: true },
        supporter: { type: Number, default: 0 },
        content: { type: Number, default: 0 },
        connection: { type: Number, default: 0 },
        role: {
            type: String,
            enum: ['Content Creator', 'Upcoming Content Creator', 'Viewer'],
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
UserSchema.index({ phoneNo: 1 });
UserSchema.index({ email: 1, emailVerify: 1 });

export default model<IUser.User>(ENUM.COL.USER, UserSchema);
