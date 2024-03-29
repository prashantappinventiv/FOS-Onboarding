import mongoose, { Schema } from 'mongoose';
import { ENUM } from '../common/enum.common';

const OtpSchema = new mongoose.Schema(
    {
        otp: { type: String, required: true },
        expiary: { type: Schema.Types.Date, required: true },
        isVerified: { type: Boolean, required: true, default: false },
        user: { type: mongoose.Schema.Types.ObjectId, ref: ENUM.COL.USER, required: true },
    },
    {
        timestamps: true,
    }
);

const Otp = mongoose.model('Otp', OtpSchema);

export { Otp };
