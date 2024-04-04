export const ENUM = {
    USER: {
        STATUS: {
            ACTIVE: 1,
            INACTIVE: 2,
            DELETED: 3,
            DEFAULT: 4,
        },
    },

    ACCOUNT_TYPE: {
        ADMIN: 1,
        USER: 2,
    },

    NOTIFICATION: {
        ENABLE: 0,
        DISABLE: 1,
    },

    PLATFORM: { ANDROID: 0, IOS: 1, WEB: 2, ALL: 4 },

    COL: {
        USER: 'users',
        USER_SESSION: 'user_session',
    },

    ROLE: {
        CONTENT: 'Content Creator',
        UPCOMING_CONTENT: 'Upcoming Content Creator',
        VIEWER: 'Viewer',
    },
    
    ACTION: {
        SIGNUP: 'Signup Event',
        LOGIN: 'Login Event',
        RESET: 'Reset Password',
        CHANGE: 'Change Password',
        FORGET: 'Forget Password',
    },
};

export const ENUM_ARRAY = {
    USER: {
        STATUS: Object.values(ENUM.USER.STATUS),
    },
    PLATFORM: Object.values(ENUM.PLATFORM),
};
