/**
 * @name user.model
 * @description defines schema for user model
 * @author Fos Social Dev Team
 */

import { Schema, model } from 'mongoose';
import { ENUM, ENUM_ARRAY } from '../common';

export const UserSchema: any = new Schema(
    {
        email: { type: String, required: true, trim: true },
        password: { type: String },
        status: { type: Number, enum: ENUM_ARRAY.USER.STATUS, default: ENUM.USER.STATUS.ACTIVE },
        name: { type: String, trim: true, unique: true, required:true },
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
UserSchema.index({ email: 1 });

export default model<IUser.User>(ENUM.COL.USER, UserSchema);
