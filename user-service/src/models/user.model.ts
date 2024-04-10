/**
 * @name user.model
 * @description defines schema for user model
 * @author Fos Social Dev Team
 */

import { Schema, model } from 'mongoose';
import { ENUM, ENUM_ARRAY } from '../common';

export const UserSchema: any = new Schema(
    {
        email: { type: String, required: true, trim: true, unique: true },
        password: { type: String, trim: true, required: true },
        status: { type: Number, enum: ENUM_ARRAY.USER.STATUS, default: ENUM.USER.STATUS.ACTIVE },
        user_name: { type: String, trim: true, unique: true },
        name: {
            firstName: { type: String, trim: true, required: false },
            middleName: { type: String, trim: true, required: false },
            lastName: { type: String, trim: true, required: false },
        },
        role: {
            type: String,
            enum: [ENUM.ROLE.CONTENT, ENUM.ROLE.UPCOMING_CONTENT, ENUM.ROLE.VIEWER],
            required: true,
        },
        isEmailVerify: { type: Boolean, required: false, default: false },
    },
    {
        versionKey: false,
        collection: ENUM.COL.USER,
        timestamps: true,
    }
);

UserSchema.index({ name: 1 });
UserSchema.index({ email: 1 });

export default model<IUser.User>(ENUM.COL.USER, UserSchema);
