export as namespace IOtp;

import { Document } from 'mongoose';

export interface OtpModel extends Document {
    otp: string;
    otpTimeStamp: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
