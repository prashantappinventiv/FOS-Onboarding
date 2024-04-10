/**
 * @name properties.model
 * @description defines schema for property model
 * @author FOS - Socail Dev Team
 */

import { Schema, model } from 'mongoose';
import { ENUM } from '../common';

const otpSchema = new Schema(
    {
        otp: { type: Schema.Types.String, default: 0 },
        otpType: {
            type: String,
            enum: [ENUM.OTP_TYPE.LOGIN, ENUM.OTP_TYPE.FORGOT_PASSWORD, ENUM.OTP_TYPE.VERIFIED_EMAIL],
            default: ENUM.OTP_TYPE.LOGIN,
            required: true,
        },
        isVerified: { type: Schema.Types.Boolean, default: false },
        userId: { type: Schema.Types.ObjectId, ref: ENUM.COL.USER, required: true },
        otpTimeStamp: { type: Date, default: Date.now() },
    },
    {
        versionKey: false,
        collection: ENUM.COL.OTP,
        timestamps: true,
    }
);

export default model<IOtp.OtpModel>(ENUM.COL.OTP, otpSchema);
