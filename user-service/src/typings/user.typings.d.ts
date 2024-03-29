export as namespace IUser;

export interface Signup {
    name: string;
    email: string;
    password: string;
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
    otp: string;
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
