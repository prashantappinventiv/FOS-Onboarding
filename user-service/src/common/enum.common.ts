export const ENUM = {
    USER: {
        STATUS: {
            ACTIVE: 1,
            INACTIVE: 2,
            DELETED: 3,
        },
    },

    ACTION:{
        SIGNUP:"signup",
        LOGIN:"login",
        RESET_PASSWORD:"reset-password",
        FORGOT_PASSWORD:"forgot-password",
    },

    ACCOUNT_TYPE: {
        ADMIN: 1,
        USER: 2,
    },

    OTP_TYPE: {
        LOGIN: 1,
        FORGOT_PASSWORD: 2,
    },

    NOTIFICATION: {
        ENABLE: 0,
        DISABLE: 1,
    },

    PLATFORM: { ANDROID: 0, IOS: 1 },

    COL: {
        USER: 'users',
        USER_SESSION: 'user_session',
        OTP: 'otp',
    },

    ROLE: {
        CONTENT: 'Content Creator',
        UPCOMING_CONTENT: 'Upcoming Content Creator',
        VIEWER: 'Viewer',
    },
};

export const ENUM_ARRAY = {
    USER: {
        STATUS: Object.values(ENUM.USER.STATUS),
    },
    PLATFORM: Object.values(ENUM.PLATFORM),
};
