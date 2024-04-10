export as namespace IUser;

export interface Signup {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface Login {
    name?: string;
    email?: string;
    password: string;
}

interface UserDevice {
    id?: string;
    name?: string;
    platform?: string;
    token?: string;
    version?: string;
}

export interface UserSession extends Document {
    device?: UserDevice;
    isActive: boolean;
    userId: User['_id'];
}

export interface VerifyOtp {
    userId: string;
    isActive?: number;
    otp: string;
    type: number;
    deviceDetails: {
        ip: string;
        deviceId: string;
        deviceType: number;
        deviceToken: string;
        os: string;
    };
}

export interface VerifyEmail {
    email: string;
}
export interface resetPassword {
    resetPasswordToken: string;
    password: string;
    email: string;
}

export interface User extends Document {
    otp?: string;
    phoneNo?: string;
    email: string;
    zipcode?: string;
    name?: string;
    countryCode?: string;
    password?: string;
    userType?: number;
    status?: number;
    username?: string;
    profileCompleted?: boolean;
    accountVerify?: boolean;
    phoneVerify?: boolean;
    emailVerify?: boolean;
}
