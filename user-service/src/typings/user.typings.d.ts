export as namespace IUser;

export interface Signup {
    name: string;
    email: string;
    password: string;
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
